/**
 * Module 1 - Topic 3: Functions, Callbacks, and Closures
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * You'll see lots of async calls and callback functions in JS. Knowing how
 * closures work explains how functions "remember" variables even after their
 * parent functions finish executing. This is a common advanced JS interview topic.
 */

console.log("=== Lesson 1: Function Declarations vs Expressions vs Arrow Functions ===");

// 1. Function Declaration (hoisted - can be called before written)
sayHello();
function sayHello() {
    console.log("Hello from a function declaration!");
}

// 2. Function Expression (not hoisted - throws reference error if called before)
const sayGoodbye = function() {
    console.log("Goodbye from a function expression!");
};
sayGoodbye();

// 3. Arrow Functions (modern syntax, shorthand, dynamic lexical binding of 'this')
const sayGoodDay = () => console.log("Good day from an arrow function!");
sayGoodDay();

// 4. The critical difference with 'this':
const orderObject = {
    orderId: "SO-99281",
    items: ["Iron Ranger 8111", "Boot Cream"],
    
    // Normal function expression: 'this' refers to the object calling it (orderObject)
    printSummary: function() {
        console.log("Normal function this.orderId:", this.orderId); // Prints SO-99281
    },

    // Arrow function: 'this' is inherited from the LEXICAL scope (where the object literal is defined).
    // In Node.js CommonJS modules, top-level 'this' is 'module.exports' (an empty {}), not the global object.
    // In browser scripts, it would be 'window'. Either way, it's NOT the orderObject.
    printSummaryArrow: () => {
        console.log("Arrow function this.orderId:", this?.orderId); // undefined!
    }
};
orderObject.printSummary();
orderObject.printSummaryArrow();


console.log("\n=== Lesson 2: Callbacks ===");

// Callbacks are functions passed as arguments to other functions.
// We use them heavily in Express routes (middleware) and async code.
function processOrder(orderId, paymentCallback) {
    console.log(`Processing payment for Order ${orderId}...`);
    // Simulate payment transaction
    const success = true;
    paymentCallback(success);
}

// We pass an anonymous function as the callback
processOrder("SO-456", (isSuccessful) => {
    if (isSuccessful) {
        console.log("Order processed successfully. Emailing receipt!");
    } else {
        console.log("Payment failed. Prompting user to retry.");
    }
});


console.log("\n=== Lesson 3: Closures & Private State ===");

// A closure is the combination of a function bundled together with references to its surrounding state.
// In simple terms: a nested function has access to the outer function's variables, even after the outer function finishes.
function createCartManager() {
    // This variable is private and cannot be accessed directly from outside createCartManager()
    let cartItems = [];

    return {
        addItem: function(productName) {
            cartItems.push(productName);
            console.log(`Added ${productName}. Cart now has ${cartItems.length} items.`);
        },
        getCartCount: function() {
            return cartItems.length;
        },
        viewCart: function() {
            // Returns a copy to preserve private references (reference safety!)
            return [...cartItems];
        }
    };
}

const myCart = createCartManager();
myCart.addItem("875 Classic Moc");
myCart.addItem("Care kit");
console.log("Item count:", myCart.getCartCount()); // Prints 2
console.log("Attempting direct access to cartItems:", myCart.cartItems); // undefined (it is private!)
console.log("Safe view of items:", myCart.viewCart()); // ['875 Classic Moc', 'Care kit']
