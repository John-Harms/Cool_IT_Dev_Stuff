/**
 * Main Web Server Entry Point (app.js)
 * 
 * 💡 RUNNING THE SERVER:
 * From the 'js-interview-prep' directory, run:
 *   npm install
 *   npm start
 * 
 * Then open your browser and navigate to: http://localhost:3000
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT ?? 3000;

// Import Custom Middlewares & Controllers
const { sessionSimulator, csrfInjector, csrfProtection } = require('./09_forms_csrf');
const mainRouter = require('./06_controllers_routes');
const { log } = require('./08_services_logging');

// 1. Configure EJS View Engine (Templates)
// This simulates ISML templates compiled by the application server
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Body Parser Middleware (To parse incoming POST form data)
app.use(express.urlencoded({ extended: true }));

// 3. Custom Session Simulator Middleware
// Simulates user state tracking across clicks
app.use(sessionSimulator);

// 4. Custom CSRF Protection Middleware
// Guards against form hijacking. Requires hidden _csrf tokens.
app.use(csrfProtection);

// 5. Custom CSRF Injector Middleware
// Makes 'csrfToken' helper available to all EJS templates
app.use(csrfInjector);

// 6. Register Application Routes
app.use('/', mainRouter);

// 7. Global Catch-All Error Middleware (500 Error Protection)
// If any controller crashes unexpectedly, this catches the exception 
// to prevent the Node server from shutting down and displays a fallback error page.
// ⚠️ INTERVIEW TIP: The 4-parameter signature (err, req, res, next) is what makes Express 
// recognize this as an error handler, NOT a regular middleware. Removing any parameter breaks it.
app.use((err, req, res, next) => {
    log('custom-errors.log', 'ERROR', 'CRITICAL_EXCEPTION', err.stack);
    
    res.status(500).render('product', {
        product: null,
        activePage: 'error',
        title: "Server Error",
        error: "A critical internal server error occurred while processing your request. Please view 'logs/custom-errors.log' for details."
    });
});

// 8. Start listening on selected PORT
app.listen(PORT, () => {
    console.log(`\n============================================================`);
    console.log(`🚀 Heritage Boots Storefront Simulator running on port ${PORT}`);
    console.log(`🔗 Local Address: http://localhost:${PORT}`);
    console.log(`📂 Log Directory: ${path.join(__dirname, '../logs')}`);
    console.log(`============================================================\n`);
});
