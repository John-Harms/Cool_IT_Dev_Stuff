/**
 * Module 3 - Topic 2: Route Overrides, Prepends, and Appends (Middleware)
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * SFCC stores code in cartridges. To modify a core feature (like checkout or product display) 
 * without modifying the core cartridges, developers use Route Overrides:
 * - Prepend: Run code BEFORE the core route controller (e.g., redirecting users based on geo-location).
 * - Append: Run code AFTER the core route controller resolves, but before rendering (e.g., adding promotional banners to the context).
 * 
 * In Express, we achieve this using Middleware functions!
 */

const { log } = require('./08_services_logging');

// ----------------------------------------------------
// 1. Prepend Middleware (Runs BEFORE the controller)
// ----------------------------------------------------
/**
 * Intercepts requests, logs the footprint, and inspects headers or queries.
 */
function routePrependLog(req, res, next) {
    const routeName = req.originalUrl;
    log('service.log', 'INFO', 'ROUTE_PREPEND', `Request intercepted for route: ${routeName}`);
    
    // We can attach request initiation timestamps to calculate response speed later
    req.startTime = Date.now();
    
    next(); // Pass control to the next function in the chain (either another middleware or the controller)
}

// ----------------------------------------------------
// 2. Append Middleware (Simulates SFCC server.append())
// ----------------------------------------------------
/**
 * Simulates SFCC server.append(). In SFCC, append code runs after the main controller.
 * In Express, this middleware runs BEFORE the controller in the chain, but achieves
 * the same effect: it pre-populates res.locals with promotional data that the 
 * controller's render call then picks up automatically.
 */
function routeAppendPromo(req, res, next) {
    const productId = req.params.id;
    
    // Let's only apply the promo banner to specific heritage boot styles (like 8111)
    if (productId === "8111") {
        res.locals.promo = {
            title: "Heritage Boot Care Promotion",
            description: "Get 20% off Boot Cream and Brush when purchasing any Heritage boots today!",
            discountText: "20% OFF CARE"
        };
        log('service.log', 'INFO', 'ROUTE_APPEND', `Injected product promo details into response context for product: ${productId}`);
    }
    
    next();
}

module.exports = {
    routePrependLog: routePrependLog,
    routeAppendPromo: routeAppendPromo
};
