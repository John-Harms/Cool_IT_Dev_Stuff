/**
 * Module 3 - Topic 1: Controllers & Route Handlers
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * Controllers are the entry point of SFCC storefront requests. They capture 
 * user inputs, call services, and render template output. 
 * Below, we implement standard Express router endpoints that replicate this pattern.
 */

const express = require('express');
const router = express.Router();

const { getCatalogProduct, fetchPriceFromERP, log } = require('./08_services_logging');
const { routePrependLog, routeAppendPromo } = require('./07_route_overrides');
const { validateCheckoutForm } = require('./09_forms_csrf');

// ----------------------------------------------------
// 🏠 1. Home Page Controller
// ----------------------------------------------------
router.get('/', routePrependLog, (req, res) => {
    res.render('home', {
        activePage: 'home',
        title: "Heritage Boots Storefront - Home"
    });
});

// ----------------------------------------------------
// 🥾 2. Product Detail Page Controller (Product-Show)
// ----------------------------------------------------
// Note: We mount routePrependLog and routeAppendPromo middlewares to simulate prepend/append route decoration.
router.get('/product/:id', routePrependLog, routeAppendPromo, async (req, res) => {
    const productId = req.params.id;
    log('service.log', 'INFO', 'CONTROLLER', `Handling Product-Show request for product: ${productId}`);

    // A. Fetch base catalog data from local DB
    const product = getCatalogProduct(productId);
    
    if (!product) {
        // Log mismatch and render layout showing "Not Found" error
        log('custom-errors.log', 'WARN', 'PRODUCT_CONTROLLER', `Product ID ${productId} not found in catalog.`);
        return res.status(404).render('product', {
            product: null,
            activePage: 'product',
            title: "Product Not Found"
        });
    }

    // B. Attempt to fetch live dynamic price from ERP API
    try {
        const livePrice = await fetchPriceFromERP(productId);
        product.price = livePrice;
        product.isFallback = false;
    } catch (error) {
        // If ERP service call fails, write a custom error log and apply cached price fallback
        log('custom-errors.log', 'ERROR', 'ERP_SERVICE', `Failed to load live price: ${error.message}. Resolving fallback price.`);
        
        // Applying fallback pricing to protect customer experience
        product.price = 299.99; // Cached catalog backup price
        product.isFallback = true;
    }

    // C. Render the dynamic template (EJS behaves like ISML templates)
    res.render('product', {
        product: product,
        activePage: 'product',
        title: `${product.name} - Heritage Series`
    });
});

// ----------------------------------------------------
// 💳 3. Checkout Form Controllers (Checkout-Start)
// ----------------------------------------------------
router.get('/checkout', routePrependLog, (req, res) => {
    res.render('checkout', {
        activePage: 'checkout',
        title: "Checkout - Order Confirmation"
    });
});

router.post('/checkout', routePrependLog, (req, res) => {
    const formData = req.body;
    log('service.log', 'INFO', 'CHECKOUT_CONTROLLER', `Processing checkout request for buyer: ${formData.fullName}`);

    // A. Run validations on input fields
    const validationErrors = validateCheckoutForm(formData);

    if (validationErrors.length > 0) {
        log('custom-errors.log', 'WARN', 'CHECKOUT_VALIDATION', `Validation failed for checkout. Errors: ${validationErrors.join(', ')}`);
        
        // Render form with errors and preserve form data so user doesn't lose inputs (UX best practice)
        return res.render('checkout', {
            activePage: 'checkout',
            title: "Checkout - Errors Found",
            validationErrors: validationErrors,
            formData: formData
        });
    }

    // B. Validation passed, create mock order
    const mockOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    log('service.log', 'INFO', 'CHECKOUT_SUCCESS', `Order created successfully: ${mockOrderId}`);

    // Render success screen
    res.render('checkout', {
        activePage: 'checkout',
        title: "Checkout Success",
        success: true,
        orderId: mockOrderId
    });
});

module.exports = router;
