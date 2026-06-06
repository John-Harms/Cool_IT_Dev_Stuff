/**
 * Solution - Exercise 1: JavaScript Core Basics & Scoping
 */

console.log("--- Task 1 Solution: Fix the Scoping Bug ---");
// Changing 'var i' to 'let i' block-scopes the index variable for each loop iteration.
// This ensures that each callback function captures a distinct instance of 'i' containing its correct value.
function runBootCatalogAlerts() {
    const messages = [];
    const boots = ["Iron Ranger", "Classic Moc", "Blacksmith"];

    // FIX: Changed 'var i = 0' to 'let i = 0'
    for (let i = 0; i < boots.length; i++) {
        messages.push(function() {
            return `Boot #${i} is ${boots[i]}`;
        });
    }

    return messages;
}

const alerts = runBootCatalogAlerts();
console.log("Task 1 Output:", alerts[0]()); // "Boot #0 is Iron Ranger"


console.log("\n--- Task 2 Solution: Safe Deep Object Property Access ---");
// Using optional chaining (?.) checks if parents exist, and nullish coalescing (??) provides a fallback if resolved to null/undefined.
const incompleteApiResponse = {
    productId: "8111",
    inventory: {
        unitsAvailable: 12
    }
};

function getProductPriceSafely(apiData) {
    // FIX: Added ?. and ?? fallback
    const price = apiData?.inventory?.pricing?.basePrice ?? 0.00;
    return price;
}

console.log("Task 2 Output:", getProductPriceSafely(incompleteApiResponse)); // 0.00


console.log("\n--- Task 3 Solution: Deep Cloning a Cart Object ---");
// JSON.parse(JSON.stringify(object)) is a standard, native way to recursively duplicate an object, severing references.
const originalCart = {
    customerId: "CUST-98",
    items: [
        { sku: "8111-10D", quantity: 1 },
        { sku: "care-cream", quantity: 2 }
    ]
};

function cloneAndAddPromo(cart) {
    // FIX: Implemented recursive deep cloning via JSON serialization
    const clonedCart = JSON.parse(JSON.stringify(cart));

    if (clonedCart.items && clonedCart.items[0]) {
        clonedCart.items[0].quantity = 5;
    }
    return clonedCart;
}

const modifiedCart = cloneAndAddPromo(originalCart);
console.log("Original Quantity:", originalCart.items[0].quantity); // 1 (unchanged!)
console.log("Cloned Quantity:", modifiedCart.items[0].quantity); // 5


console.log("\n--- Task 4 Solution: Catalog Array Transformation ---");
const catalog = [
    { name: "Iron Ranger", price: 349.99, inStock: true },
    { name: "Classic Moc", price: 319.99, inStock: false },
    { name: "Work Chukka", price: 249.99, inStock: true },
    { name: "Boot Brush", price: 15.00, inStock: true }
];

function processCatalogTotal(items) {
    // FIX: Combined filter, map, and reduce
    const totalSum = items
        .filter(p => p.inStock) // Keep only in-stock items
        .map(p => p.price * 0.75) // Apply 25% discount
        .reduce((sum, price) => sum + price, 0); // Accumulate values starting from 0
    
    return parseFloat(totalSum.toFixed(2));
}

console.log("Task 4 Output:", processCatalogTotal(catalog)); // 461.24
