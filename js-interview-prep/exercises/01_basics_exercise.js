/**
 * Exercise 1: JavaScript Core Basics & Scoping
 * 
 * 🏃‍♂️ TO RUN THIS FILE:
 *   node exercises/01_basics_exercise.js
 * 
 * Fill in the blanks or fix the code in each section to make the assertions pass.
 */

// We use this tiny helper to test your outputs
function assert(name, condition, expected, actual) {
    if (condition) {
        console.log(`✅ [PASS] ${name}`);
    } else {
        console.error(`❌ [FAIL] ${name}\n   Expected: ${JSON.stringify(expected)}\n   Actual:   ${JSON.stringify(actual)}`);
    }
}


console.log("--- Task 1: Fix the Scoping Bug ---");
/**
 * Context: We have a catalog loop that prints available boots.
 * Bug: The loop uses 'var' for the loop index, which leaks.
 * Goal: Adjust the function to use correct scoping so that the console prints 
 * the expected index numbers (0, 1, 2) rather than leaking the terminal number (3).
 */

function runBootCatalogAlerts() {
    const messages = [];
    const boots = ["Iron Ranger", "Classic Moc", "Blacksmith"];

    // TODO: Fix the declaration in the loop below so it block-scopes properly
    for (var i = 0; i < boots.length; i++) {
        // We set a brief delay. In real code this might be rendering individual cards.
        // Because of 'var' scoping, the callback is bound to the single 'i' variable, which becomes 3 at the end of loop.
        messages.push(function () {
            return `Boot #${i} is ${boots[i]}`;
        });
    }

    return messages;
}

const alerts = runBootCatalogAlerts();
// If you fix it, the first call should return "Boot #0 is Iron Ranger"
const outputMsg = alerts[0]();
assert("Task 1 - Loop block scoping", outputMsg === "Boot #0 is Iron Ranger", "Boot #0 is Iron Ranger", outputMsg);


console.log("\n--- Task 2: Safe Deep Object Property Access ---");
/**
 * Context: You receive a response from a third-party inventory API. Sometimes, the 
 * response is missing fields. You need to write a helper to safely extract the price 
 * value or return a default backup price of 0.00 without throwing errors.
 */

const incompleteApiResponse = {
    productId: "8111",
    inventory: {
        unitsAvailable: 12
        // Note: 'pricing' object is missing!
    }
};

function getProductPriceSafely(apiData) {
    // TODO: Rewrite the line below using Optional Chaining and Nullish Coalescing
    // to access apiData.inventory.pricing.basePrice. If missing, return 0.00
    const price = apiData.inventory.pricing.basePrice;
    // Hint: Use optional chaining (?.) to safely navigate and nullish coalescing (??) to provide a default of 0.00
    return price;
}

let priceResult;
try {
    priceResult = getProductPriceSafely(incompleteApiResponse);
} catch (e) {
    priceResult = `CRASH: ${e.message}`;
}
assert("Task 2 - Safe Object Navigation", priceResult === 0.00, 0.00, priceResult);


console.log("\n--- Task 3: Deep Cloning a Cart Object ---");
/**
 * Context: When a user modifies their cart page, we modify a copy of the cart.
 * We must NOT mutate the original master session cart!
 * Below, implement a deep copy of the cart object.
 */

const originalCart = {
    customerId: "CUST-98",
    items: [
        { sku: "8111-10D", quantity: 1 },
        { sku: "care-cream", quantity: 2 }
    ]
};

function cloneAndAddPromo(cart) {
    // TODO: Implement a DEEP CLONE of the cart object so that changing nested properties 
    // in the cloned cart does not modify the originalCart.
    // Hint: Standard spread operator '...' only does a shallow copy!
    const clonedCart = { ...cart }; // Replace this line with deep copy code

    // Mutate the clone's nested item quantity
    if (clonedCart.items && clonedCart.items[0]) {
        clonedCart.items[0].quantity = 5;
    }
    return clonedCart;
}

const modifiedCart = cloneAndAddPromo(originalCart);
assert(
    "Task 3 - Deep copy check (original unaffected)",
    originalCart.items[0].quantity === 1,
    "original quantity: 1",
    `original quantity: ${originalCart.items[0].quantity}`
);


console.log("\n--- Task 4: Catalog Array Transformation ---");
/**
 * Context: Given an array of products, you must write a script to:
 * 1. Filter out products that are NOT in stock.
 * 2. Calculate the discounted price (25% off) for each remaining product.
 * 3. Sum the total cost of all the discounted, in-stock products.
 */

const catalog = [
    { name: "Iron Ranger", price: 349.99, inStock: true },
    { name: "Classic Moc", price: 319.99, inStock: false },
    { name: "Work Chukka", price: 249.99, inStock: true },
    { name: "Boot Brush", price: 15.00, inStock: true }
];

function processCatalogTotal(items) {
    // TODO: Combine filter, map, and reduce to solve the task.
    // 1. Filter: inStock must be true
    // 2. Map: price must be reduced by 25% (multiply price by 0.75)
    // 3. Reduce: Sum the discounted prices
    // Format the final sum using parseFloat(sum.toFixed(2)) to avoid floating point issues.

    const itemSums = 0; // Replace this with a filter → map → reduce chain
    return parseFloat(itemSums.toFixed(2)); // Replace this
}

const totalSum = processCatalogTotal(catalog);
const expectedSum = 461.24; // (349.99 * 0.75) + (249.99 * 0.75) + (15 * 0.75) = 262.49 + 187.49 + 11.25 = 461.24
assert("Task 4 - Functional Array Processing", totalSum === expectedSum, expectedSum, totalSum);
