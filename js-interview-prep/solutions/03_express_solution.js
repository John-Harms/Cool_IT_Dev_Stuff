/**
 * Solution - Exercise 3: Express.js Routing, Middleware, and Validation
 */

const express = require('express');
const app = express();
const PORT = 3051; // Running on separate port 3051 to avoid address conflicts

app.use(express.urlencoded({ extended: true }));

let mockCart = {
    items: [
        { name: "Iron Ranger Boots", price: 349.99 },
        { name: "Boot Brush", price: 15.00 }
    ],
    couponCode: null
};

// ----------------------------------------------------
// 🛠️ Task 1 Solution: Write a Custom Middleware
// ----------------------------------------------------
function calculateTotalAndDiscount(req, res, next) {
    // FIX: Sum items, verify coupon, calculate grand total
    const subtotal = mockCart.items.reduce((sum, item) => sum + item.price, 0);
    
    let discount = 0;
    if (mockCart.couponCode === "BOOTCAMP20") {
        discount = subtotal * 0.20; // 20% off
    }
    
    const total = subtotal - discount;

    // Attach to res.locals so templates can render them
    res.locals.subtotal = subtotal;
    res.locals.discount = discount;
    res.locals.total = total;

    next(); // CRITICAL: Call next() to allow execution to proceed!
}

// 🏠 Cart Page Route
app.get('/', calculateTotalAndDiscount, (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Heritage Boots Exercise Cart - Solved</title>
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
                <h1>Your Heritage Cart - Solved</h1>
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
// 🛠️ Task 2 Solution: Implement Coupon Validation Controller
// ----------------------------------------------------
// FIX: Added route checking body parameters and resetting coupon values accordingly.
app.post('/coupon', (req, res) => {
    const rawCode = req.body.coupon ?? '';
    
    // Check case-insensitive coupon value
    if (rawCode.trim().toUpperCase() === "BOOTCAMP20") {
        mockCart.couponCode = "BOOTCAMP20";
    } else {
        mockCart.couponCode = null;
    }
    
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`\n============================================================`);
    console.log(`🚀 Standalone Express Solution running at http://localhost:${PORT}`);
    console.log(`============================================================\n`);
});
