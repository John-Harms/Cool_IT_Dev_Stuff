/**
 * Exercise 4: Code Comprehension & Interview Review
 * 
 * 💡 READ AND REASON:
 * Junior Web Developer interviews heavily assess your ability to READ and EXPLAIN code
 * rather than just writing it from scratch. Look at the snippets below, analyze
 * what is wrong, and answer the questions. 
 * 
 * You can write your answers down in comments below each question, and then compare 
 * them with the solutions file!
 */

// ------------------------------------------------------------------------
// 🧩 Snippet 1: The Loop Callback Bug
// ------------------------------------------------------------------------
/*
const buttons = ['Home', 'Products', 'Checkout'];
for (var i = 0; i < buttons.length; i++) {
    const btnName = buttons[i];
    registerClickEvent(btnName, function() {
        console.log(`User clicked button: ${btnName} at index ${i}`);
    });
}
*/

// QUESTION 1A:
// In this snippet, if the user clicks the 'Home' button, what index 'i' will be printed?
// Write your answer here:
// 

// QUESTION 1B:
// Why does this happen, and how would you fix it using modern ES6 syntax?
// Write your answer here:
// 


// ------------------------------------------------------------------------
// 🧩 Snippet 2: Silent Async Failures
// ------------------------------------------------------------------------
/*
async function updateInventoryLevel(productId, stockDelta) {
    const erpClient = new ErpServiceConnection();
    const result = await erpClient.postStockChange(productId, stockDelta);
    return result.status === 'SUCCESS';
}

app.post('/inventory/update', (req, res) => {
    const success = updateInventoryLevel(req.body.id, req.body.delta);
    if (success) {
        res.send("Inventory updated!");
    } else {
        res.status(500).send("Database sync failed");
    }
});
*/

// QUESTION 2A:
// There are TWO severe architectural bugs in this snippet. First, what happens to the Express route 
// execution if 'erpClient.postStockChange' throws an network connection error?
// Write your answer here:
// 

// QUESTION 2B:
// Second, why will the 'if (success)' statement inside the router handler ALWAYS evaluate to true, 
// even if the stock change fails?
// Write your answer here:
// 


// ------------------------------------------------------------------------
// 🧩 Snippet 3: Reference Mutation Leak
// ------------------------------------------------------------------------
/*
function calculatePromoDiscount(sessionCart, promotion) {
    const cart = sessionCart;
    
    if (promotion.code === "BOOTCAMP20") {
        cart.totalDiscount = cart.subtotal * 0.20;
        cart.grandTotal = cart.subtotal - cart.totalDiscount;
    }
    
    return cart;
}
*/

// QUESTION 3A:
// When this function runs, does the master 'sessionCart' passed in get modified? Why?
// Write your answer here:
// 

// QUESTION 3B:
// How would you modify the first line of the function to prevent this side-effect?
// Write your answer here:
// 


// ------------------------------------------------------------------------
// 🧩 Snippet 4: Middleware Sequence
// ------------------------------------------------------------------------
/*
app.use(checkSessionCookie);

app.get('/order/history', checkAuthentication, fetchOrderDetails, (req, res) => {
    res.render('orders', { orders: res.locals.orders });
});
*/

// QUESTION 4A:
// Trace the execution order of the functions when a user requests GET /order/history. 
// List them in sequence.
// Write your answer here:
// 

// QUESTION 4B:
// If 'checkAuthentication' determines the user is NOT logged in and calls 'res.redirect('/login')' 
// without calling 'next()', do the 'fetchOrderDetails' function and the inline route controller run? Why?
// Write your answer here:
// 
