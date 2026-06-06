/**
 * Module 1 - Topic 2: Objects, Arrays, and Reference Safety
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * In eCommerce platforms like SFCC, you're constantly handling large JSON objects
 * representing products, catalog entries, and customer carts. Knowing how to 
 * transform arrays and access properties without crashing the server is essential.
 */

console.log("=== Lesson 1: Object & Array References ===");

// In JS, objects and arrays are stored by REFERENCE, not by value.
const productA = { name: "877 Classic Moc", price: 329.99 };
const productB = productA; // Copies the REFERENCE, not the actual object!

productB.price = 349.99; // Modifies the object productA points to!
console.log("productA price after editing productB:", productA.price); // Prints 349.99!

// Shallow copy (spread operator '...') creates a new object container, but nested objects remain shared references.
const productOriginal = {
    id: "8111",
    details: { leather: "Amber Harness", sole: "Vibram" }
};
const productShallowCopy = { ...productOriginal };
productShallowCopy.id = "8085"; // Only changes copy
productShallowCopy.details.leather = "Copper Rough & Tough"; // Mutates productOriginal too!

console.log("Original details:", productOriginal.details.leather); // Prints "Copper Rough & Tough"

// Deep Copy: Creating a completely isolated clone
const productDeepCopy = JSON.parse(JSON.stringify(productOriginal));
productDeepCopy.details.leather = "Black Harness";
console.log("Original details (unchanged after deep copy edit):", productOriginal.details.leather); // Prints "Copper Rough & Tough"

// Modern Alternative (Node 17+ / all modern browsers):
// structuredClone() is the native deep copy built-in. It handles more edge cases than JSON 
// (e.g., Dates, RegExp, Maps) and is the preferred modern approach.
const productNativeCopy = structuredClone(productOriginal);
productNativeCopy.details.sole = "Cork";
console.log("Original sole (unchanged after structuredClone edit):", productOriginal.details.sole); // Prints "Vibram"


console.log("\n=== Lesson 2: Safe Property Access (Optional Chaining & Nullish Coalescing) ===");

const apiResponse = {
    product: {
        id: "101",
        name: "Work Chukka",
        // Note: price is missing, availability is null
        availability: null
    }
};

// Accessing nested properties can crash the application if a parent key is undefined:
try {
    console.log(apiResponse.product.price.value); // Crashes: Cannot read properties of undefined (reading 'value')
} catch (e) {
    console.log("Crashed trying to read nested key:", e.message);
}

// Option A: Old Way (verbose logical AND checks)
const oldPrice = apiResponse.product && apiResponse.product.price && apiResponse.product.price.value;
console.log("Old Way Price:", oldPrice); // undefined (safe, no crash)

// Option B: Modern JS Way (Optional Chaining '?.' and Nullish Coalescing '??')
// '?.' stops evaluation and returns undefined if the property before it is null/undefined.
const modernPriceValue = apiResponse.product?.price?.value;
console.log("Modern Way Price:", modernPriceValue); // undefined (safe)

// '??' provides a default fallback if the value is null or undefined (but NOT for empty strings or 0, unlike '||')
const finalPrice = apiResponse.product?.price?.value ?? 0.00;
const status = apiResponse.product?.availability ?? "unknown";
console.log("Final Price (with default):", finalPrice); // 0.00
console.log("Availability Status:", status); // "unknown"


console.log("\n=== Lesson 3: Array Transformations (map, filter, reduce) ===");

const products = [
    { name: "Iron Ranger", price: 349.99, inStock: true, type: "boots" },
    { name: "Classic Moc", price: 319.99, inStock: true, type: "boots" },
    { name: "Weekender Oxford", price: 249.99, inStock: false, type: "shoes" },
    { name: "Boot Cream", price: 12.00, inStock: true, type: "care" }
];

// 1. Array.prototype.filter() -> Returns a new array with items matching a condition.
const boots = products.filter(p => p.type === "boots" && p.inStock);
console.log("In-stock Boots:", boots.map(b => b.name));
console.log(boots)

// 2. Array.prototype.map() -> Returns a new array where every element is transformed.
const discountedProductPrices = products.map(p => {
    return {
        name: p.name,
        discountedPrice: Number((p.price * 0.9).toFixed(2)) // 10% off, format to 2 decimal places as a number
    };
});
console.log("Discounted Prices:", discountedProductPrices);

// 3. Array.prototype.reduce() -> Reduces array to a single value (e.g. summing total prices).
// Syntax: array.reduce((accumulator, currentValue) => { ... }, initialValue)
const totalBootInventoryValue = products
    .filter(p => p.type === "boots" && p.inStock)
    .reduce((sum, currentProduct) => {
        return sum + currentProduct.price;
    }, 0); // 0 is the initial value for 'sum'

console.log("Total value of in-stock boots: $", totalBootInventoryValue);
