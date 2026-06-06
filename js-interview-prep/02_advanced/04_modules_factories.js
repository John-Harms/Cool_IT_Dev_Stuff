/**
 * Module 2 - Topic 1: CommonJS Modularity and Factory Patterns
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * Node.js (and SFCC cartridges) uses the CommonJS modularity system ('require' and 'module.exports').
 * You will frequently deal with "Models" (e.g., ProductModel, OrderModel) that format database objects 
 * for templates. This is done via Factory functions or Constructor patterns.
 */

console.log("=== Lesson 1: CommonJS Module Exports & Imports ===");

// In Node.js, each file is a module with its own scope. We share functions/objects using 'module.exports'.
// For this tutorial, we will define a mock Module inline to show how Node processes it under the hood:
const mockModule = {
    exports: {}
};

(function(exports, module) {
    // This is how Node wraps your file.
    // Let's define a utility function to format currency:
    function formatCurrency(amount) {
        return `$${parseFloat(amount).toFixed(2)}`;
    }

    // Exporting it
    module.exports = {
        formatCurrency: formatCurrency,
        taxRate: 0.07 // 7% sales tax
    };
})(mockModule.exports, mockModule);

// To use this in another file, you would run: const utils = require('./utils');
// Here, we simulate it by reading the exports object:
const utils = mockModule.exports;
console.log("Formatted price:", utils.formatCurrency(329.999)); // Prints $330.00
console.log("Tax Rate:", utils.taxRate); // Prints 0.07


console.log("\n=== Lesson 2: The Factory Pattern (Models) ===");

// A Factory is a function that returns a new object.
// We use this pattern to build "Product Models" in eCommerce: we take raw database data and "decorate" it 
// with helper methods and formatted values (like checking inventory and formatting price).

function ProductModel(rawDbProduct) {
    // 1. Create a base model using a copy to protect original database references
    const model = { ...rawDbProduct };

    // 2. Add custom business logic / decoration
    model.getFormattedPrice = function() {
        return `$${model.price.toFixed(2)}`;
    };

    model.getTaxAmount = function(taxRate) {
        return +(model.price * taxRate).toFixed(2);
    };

    model.getAvailabilityStatus = function() {
        if (!model.inStock) {
            return "Out of Stock";
        }
        if (model.stockCount < 5) {
            return `Hurry! Only ${model.stockCount} left`;
        }
        return "In Stock";
    };

    // 3. Return the fully decorated model
    return model;
}

// Raw data from the Database (often messy and unformatted)
const dbProduct = {
    id: "8111",
    name: "Iron Ranger in Amber Harness",
    price: 349.9,
    inStock: true,
    stockCount: 3
};

// Instantiate our Product Model using the Factory
const product = ProductModel(dbProduct);

console.log("Product Name:", product.name);
console.log("Formatted Price:", product.getFormattedPrice()); // $349.90
console.log("Availability:", product.getAvailabilityStatus()); // Hurry! Only 3 left
console.log("Tax on product ($349.90 @ 7%):", product.getTaxAmount(0.07)); // 24.49
