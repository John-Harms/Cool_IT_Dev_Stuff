/**
 * Module 1 - Topic 1: Variables, Scoping, and Hoisting
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * Older codebases (including legacy SFCC code) rely heavily on 'var'. 
 * Modern JS uses 'let' and 'const'. Knowing how they differ is a classic 
 * technical question.
 */

console.log("=== Lesson 1: Scope (Function vs Block) ===");

// 1. 'var' is FUNCTION-scoped. It ignores blocks (like if statements or loops).
function varScopeDemo() {
    if (true) {
        var functionScopedVar = "I am accessible anywhere in this function!";
    }
    console.log("var inside block:", functionScopedVar); // Works!
}
varScopeDemo();

// 2. 'let' and 'const' are BLOCK-scoped (only accessible inside { }).
function letScopeDemo() {
    if (true) {
        let blockScopedLet = "I only exist inside this block!";
        const blockScopedConst = "Me too!";
        console.log("Inside block (let):", blockScopedLet);
    }
    try {
        console.log(blockScopedLet); // Will throw a ReferenceError!
    } catch (e) {
        console.log("Outside block (let error):", e.message);
    }
}
letScopeDemo();


console.log("\n=== Lesson 2: Hoisting & The TDZ ===");

// 3. Hoisting: JavaScript moves declarations to the top of their scope before running code.
// With 'var', the variable is initialized as 'undefined'.
console.log("var before declaration:", hoistedVar); // Prints 'undefined', doesn't crash!
var hoistedVar = "Hello World";

// With 'let' and 'const', they are hoisted but NOT initialized. 
// They sit in the "Temporal Dead Zone" (TDZ) until the declaration line is hit.
try {
    console.log("let before declaration:", hoistedLet); // Throws ReferenceError
} catch (e) {
    console.log("let before declaration (error):", e.message);
}
let hoistedLet = "Hello Block";


console.log("\n=== Lesson 3: const Mutability ===");

// 4. 'const' does NOT mean "immutable value". It means "immutable binding" (cannot reassign the variable).
const shoeBrand = "Heritage Boots";
try {
    shoeBrand = "Irish Setter"; // Error: Assignment to constant variable.
} catch (e) {
    console.log("Reassigning const variable (error):", e.message);
}

// HOWEVER, the CONTENTS of objects and arrays declared with 'const' CAN be mutated!
const shoeModel = {
    name: "Classic Moc",
    styleNumber: 875,
    inStock: true
};

console.log("Original shoe model:", shoeModel);

shoeModel.inStock = false; // Modifying property works!
shoeModel.leather = "Oro Legacy"; // Adding property works!
delete shoeModel.styleNumber; // Deleting property works!

console.log("Mutated shoe model:", shoeModel);

// If you want to make an object truly immutable (read-only), use Object.freeze():
const frozenShoe = Object.freeze({
    name: "Iron Ranger",
    styleNumber: 8111
});

try {
    frozenShoe.styleNumber = 8085; // Fails silently in non-strict mode, throws error in strict mode
    console.log("After attempt to mutate frozen shoe style:", frozenShoe.styleNumber); // Still 8111
} catch (e) {
    console.log("Frozen mutation error:", e.message);
}

// ⚠️ GOTCHA: Object.freeze() is SHALLOW! Nested objects inside a frozen object CAN still be mutated.
const frozenCatalog = Object.freeze({
    brand: "Heritage Boots",
    topSeller: { name: "Iron Ranger", price: 349.99 }
});

frozenCatalog.topSeller.price = 0.01; // This WORKS — the nested object is not frozen!
console.log("Frozen catalog nested price (mutated!):", frozenCatalog.topSeller.price); // Prints 0.01
// To deeply freeze an object, you'd need a recursive freeze function or a library.
