/**
 * Exercise 3: Express.js Routing, Middleware, and Validation
 * 
 * 🏃‍♂️ TO RUN THIS FILE:
 *   node exercises/03_express_exercise.js
 * 
 * Open your browser and navigate to: http://localhost:3050
 * Use 'Ctrl+C' to stop the server once you are done testing.
 */

const express = require('express');
const app = express();
const PORT = 3050;

app.use(express.urlencoded({ extended: true }));

// Mock Cart Database
let mockCart = {
    items: [
        { name: "Iron Ranger Boots", price: 349.99 },
        { name: "Boot Brush", price: 15.00 }
    ],
    couponCode: null
};

// ----------------------------------------------------
// 🛠️ Task 1: Write a Custom Middleware (Route Append)
// ----------------------------------------------------
// Goal: Write a middleware function 'calculateTotalAndDiscount' that:
// 1. Sums the price of all items in mockCart.items.
// 2. If mockCart.couponCode is "BOOTCAMP20", apply a 20% discount.
// 3. Attach the variables 'subtotal', 'discount', and 'total' directly 
//    to res.locals so they are rendered in the HTML response.

function calculateTotalAndDiscount(req, res, next) {
    // TODO: Implement the subtotal, discount, and total calculation
    // Set them on res.locals:
    // res.locals.subtotal = ...
    // res.locals.discount = ...
    // res.locals.total = ...
    
    // Default values (replace these):
    res.locals.subtotal = 0;
    res.locals.discount = 0;
    res.locals.total = 0;

    next();
}


// ----------------------------------------------------
// 🥾 Routes Setup
// ----------------------------------------------------

// 🏠 Cart Page Route
// Uses your custom middleware to calculate values before responding
app.get('/', calculateTotalAndDiscount, (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Heritage Boots Exercise Cart</title>
            <style>
                body { font-family: sans-serif; background: #0f172a; color: #f1f5f9; padding: 40px; }
                .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; max-width: 500px; margin: 0 auto; }
                h1 { color: #f97316; }
                .line { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #334155; padding-bottom: 8px; }
                .total { font-weight: bold; font-size: 1.2em; color: #fff; border-bottom: none; }
                input, button { padding: 8px; border-radius: 4px; border: 1px solid #475569; background: #0f172a; color: #fff; }
                button { background: #f97316; font-weight: bold; border: none; cursor: pointer; }
                button:hover { background: #ea580c; }
                .alert { padding: 10px; background: rgba(22, 163, 74, 0.2); border: 1px solid #16a34a; border-radius: 4px; color: #4ade80; margin-bottom: 15px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Your Heritage Cart</h1>
                <p>Verify your totals. Apply the coupon <strong>BOOTCAMP20</strong> to test discount calculation!</p>
                
                <% if (couponApplied) { %>
                    <div class="alert">Coupon BOOTCAMP20 applied successfully!</div>
                <% } %>

                <div style="margin-bottom: 20px;">
                    ${mockCart.items.map(item => `
                        <div class="line">
                            <span>${item.name}</span>
                            <span>$${item.price.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="line">
                    <span>Subtotal:</span>
                    <span>$${res.locals.subtotal.toFixed(2)}</span>
                </div>
                <div class="line" style="color: #4ade80;">
                    <span>Discount:</span>
                    <span>-$${res.locals.discount.toFixed(2)}</span>
                </div>
                <div class="line total">
                    <span>Final Total:</span>
                    <span>$${res.locals.total.toFixed(2)}</span>
                </div>

                <form action="/coupon" method="POST" style="display: flex; gap: 10px; margin-top: 20px;">
                    <input type="text" name="coupon" placeholder="Enter Coupon Code" value="${mockCart.couponCode ?? ''}" />
                    <button type="submit">Apply Coupon</button>
                </form>
            </div>
        </body>
        </html>
    `.replace('<% if (couponApplied) { %>', mockCart.couponCode === "BOOTCAMP20" ? '<div>' : '<div style="display:none;">'));
});


// ----------------------------------------------------
// 🛠️ Task 2: Implement Coupon Validation Controller
// ----------------------------------------------------
// Goal: Write a POST route '/coupon' that:
// 1. Receives the code from req.body.coupon.
// 2. Checks if the coupon equals "BOOTCAMP20" (case-insensitive).
// 3. If valid, set mockCart.couponCode = "BOOTCAMP20".
// 4. If invalid, set mockCart.couponCode = null.
// 5. Redirect the user back to the cart page: res.redirect('/') so the totals update.

app.post('/coupon', (req, res) => {
    // TODO: Read req.body.coupon, validate it, update mockCart, and redirect back.
    
    res.redirect('/'); // Replace/extend this line
});


// Start Server
app.listen(PORT, () => {
    console.log(`\n============================================================`);
    console.log(`🚀 Standalone Express Exercise running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to terminate the server`);
    console.log(`============================================================\n`);
});
