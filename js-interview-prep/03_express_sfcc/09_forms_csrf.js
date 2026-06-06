/**
 * Module 3 - Topic 4: Forms, Validation, and CSRF Protection
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * Secure transactions require CSRF (Cross-Site Request Forgery) protection.
 * In SFCC, forms are mapped to XML structures that auto-validate input types and handle tokens.
 * Here, we implement a custom, easy-to-read session-backed CSRF middleware to show
 * exactly how these mechanisms work behind the scene.
 */

const crypto = require('crypto');
const { log } = require('./08_services_logging');

// Simple In-Memory Session Storage
// Note: This has no TTL or cleanup — sessions grow forever. In production,
// you'd use Redis, a database, or a library like express-session with automatic expiry.
const SESSIONS = {};

// ----------------------------------------------------
// 1. Simple Session Middleware
// ----------------------------------------------------
function sessionSimulator(req, res, next) {
    // Basic Cookie Parser (extracts cookie names and values)
    const rawCookies = req.headers.cookie ?? '';
    const cookies = {};
    rawCookies.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        if (parts[0] && parts[1]) {
            cookies[parts[0].trim()] = parts[1].trim();
        }
    });

    let sessionId = cookies.session_id;

    // If no session exists, create a new one
    if (!sessionId || !SESSIONS[sessionId]) {
        sessionId = crypto.randomBytes(16).toString('hex');
        SESSIONS[sessionId] = {
            id: sessionId,
            csrfToken: crypto.randomBytes(24).toString('hex') // Generate CSRF token for the session
        };
        // Set the session cookie
        res.setHeader('Set-Cookie', `session_id=${sessionId}; Path=/; HttpOnly`);
    }

    // Attach session object to request
    req.session = SESSIONS[sessionId];
    next();
}

// ----------------------------------------------------
// 2. CSRF Injector & Validator
// ----------------------------------------------------
/**
 * Injects the session's CSRF token into template locals so it can be added to forms.
 */
function csrfInjector(req, res, next) {
    res.locals.csrfToken = req.session.csrfToken;
    next();
}

/**
 * Middleware that blocks POST requests if their submitted CSRF token does not match the session's token.
 */
function csrfProtection(req, res, next) {
    if (req.method === 'POST') {
        const submittedToken = req.body._csrf;
        const actualToken = req.session.csrfToken;

        if (!submittedToken || submittedToken !== actualToken) {
            log('custom-errors.log', 'WARN', 'CSRF_SECURITY', `CSRF Token Mismatch or Missing token! IP: ${req.ip}`);
            
            // Render the checkout form with a CSRF error instead of passing to the handler
            return res.status(403).render('checkout', {
                csrfToken: req.session.csrfToken,
                activePage: 'checkout',
                title: "Checkout - CSRF Rejected",
                error: "CSRF verification failed! The form submission was rejected as potentially fraudulent.",
                formData: req.body
            });
        }
    }
    next();
}

// ----------------------------------------------------
// 3. Form Field Validation
// ----------------------------------------------------
/**
 * Checks submitted shipping and credit card fields for correctness.
 */
function validateCheckoutForm(body) {
    const errors = [];

    if (!body.fullName || body.fullName.trim().length < 3) {
        errors.push("Full Name must be at least 3 characters long.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email)) {
        errors.push("Please enter a valid email address.");
    }

    // Strips spaces and hyphens, then verifies it contains exactly 16 digits
    const cleanedCard = (body.cardNumber ?? '').replace(/[\s-]/g, '');
    if (!/^\d{16}$/.test(cleanedCard)) {
        errors.push("Credit card number must be exactly 16 digits.");
    }

    if (!body.cvv || !/^\d{3,4}$/.test(body.cvv)) {
        errors.push("CVV must be 3 or 4 digits.");
    }

    if (!body.expDate || !/^\d{2}\/\d{2}$/.test(body.expDate)) {
        errors.push("Expiration date must follow MM/YY format.");
    }

    return errors;
}

module.exports = {
    sessionSimulator: sessionSimulator,
    csrfInjector: csrfInjector,
    csrfProtection: csrfProtection,
    validateCheckoutForm: validateCheckoutForm
};
