/**
 * Solution - Exercise 4: Code Comprehension & Interview Review
 */

// ========================================================================
// 🧩 Snippet 1 Solution: The Loop Callback Bug
// ========================================================================

// QUESTION 1A:
// "In this snippet, if the user clicks the 'Home' button, what index 'i' will be printed?"
// ANSWER: 
// The index 3 will be printed for all button clicks.
// (Additionally, buttons[3] will resolve to 'undefined', causing the log to read:
// "User clicked button: undefined at index 3".)

// QUESTION 1B:
// "Why does this happen, and how would you fix it using modern ES6 syntax?"
// ANSWER:
// Because 'var' is function-scoped, the variable 'i' is shared across all iterations.
// By the time the click events are triggered (which happens asynchronously later),
// the loop has already completed, leaving 'i' at its final value of 3.
//
// FIX: Change the loop declaration to use 'let' instead of 'var'.
// 'let' is block-scoped, creating a new, isolated variable binding for each loop iteration:
//
// for (let i = 0; i < buttons.length; i++) { ... }


// ========================================================================
// 🧩 Snippet 2 Solution: Silent Async Failures
// ========================================================================

// QUESTION 2A:
// "First, what happens to the Express route execution if 'erpClient.postStockChange' throws an error?"
// ANSWER:
// The promise returned by 'updateInventoryLevel' will reject. Since there is no 'try-catch' block 
// or '.catch()' handler around the 'await' call in the route, it will result in an 
// "Unhandled Promise Rejection". In modern Node.js environments, this triggers an uncaught exception
// error that crashes the entire Node process, taking the server offline.

// QUESTION 2B:
// "Second, why will the 'if (success)' statement inside the router handler ALWAYS evaluate to true?"
// ANSWER:
// Because 'updateInventoryLevel' is declared as an 'async' function, it implicitly returns a 
// Promise object immediately. In JavaScript, all objects (including Promises) are "truthy". 
// Since the route handler does not use the 'await' keyword to wait for the promise to resolve, 
// 'success' stores the Promise object itself, which passes the 'if (success)' check.
//
// FIX:
// 1. Declare the router callback as 'async': app.post('/inventory/update', async (req, res) => { ... })
// 2. Await the function call: const success = await updateInventoryLevel(...)
// 3. Wrap it in a try-catch block to log connection failures safely.


// ========================================================================
// 🧩 Snippet 3 Solution: Reference Mutation Leak
// ========================================================================

// QUESTION 3A:
// "When this function runs, does the master 'sessionCart' passed in get modified? Why?"
// ANSWER:
// Yes. In JavaScript, objects are passed by reference. The statement 'const cart = sessionCart'
// merely copies the reference pointer, meaning 'cart' and 'sessionCart' point to the exact same 
// object in memory. Mutating 'cart' directly alters 'sessionCart'.

// QUESTION 3B:
// "How would you modify the first line of the function to prevent this side-effect?"
// ANSWER:
// Duplicate/clone the object. Since the cart has nested objects (items array), a shallow copy is 
// not enough if items properties are changed, but since we are only adding 'totalDiscount' and 'grandTotal'
// to the root, a shallow copy using the spread operator is sufficient here:
//
// const cart = { ...sessionCart };
//
// However, to be completely safe against any nested property mutations, perform a deep clone:
//
// const cart = JSON.parse(JSON.stringify(sessionCart));


// ========================================================================
// 🧩 Snippet 4 Solution: Middleware Sequence
// ========================================================================

// QUESTION 4A:
// "Trace the execution order of the functions when a user requests GET /order/history. List them in sequence."
// ANSWER:
// 1. checkSessionCookie (Global app-level middleware)
// 2. checkAuthentication (Route-level prepended middleware)
// 3. fetchOrderDetails (Route-level prepended middleware)
// 4. Inline route controller: (req, res) => { res.render(...) } (Core route handler)

// QUESTION 4B:
// "If 'checkAuthentication' determines the user is NOT logged in and calls 'res.redirect('/login')' 
// without calling 'next()', do the 'fetchOrderDetails' function and the inline route controller run? Why?"
// ANSWER:
// No, they will not run. A middleware chain only proceeds to the next function if the current middleware
// calls 'next()'. By calling 'res.redirect()' and omitting 'next()', the request-response cycle is 
// terminated, and the execution chain stops.
