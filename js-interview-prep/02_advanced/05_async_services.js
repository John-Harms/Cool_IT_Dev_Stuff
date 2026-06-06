/**
 * Module 2 - Topic 2: Asynchronous JS, Promises, and Service Fallbacks
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * Commerce platforms must talk to ERP systems (for prices), OMS (for orders), 
 * and payment gateways. These operations are slow and can fail. You must know
 * how to make these calls asynchronously, handle timeouts, and provide "fallback" values 
 * so the customer doesn't see a broken page.
 */

console.log("=== Lesson 1: Promises vs Async/Await ===");

// 1. Simulating an asynchronous database query using a Promise
function mockFetchProductPrice(productId) {
    return new Promise((resolve, reject) => {
        console.log(`[Service] Fetching price for Product ${productId} from ERP system...`);
        
        setTimeout(() => {
            if (productId === "8111") {
                resolve({ productId: "8111", price: 349.99 });
            } else if (productId === "9999") {
                reject(new Error("ERP Service Timeout - Connection refused"));
            } else {
                resolve({ productId: productId, price: 0.00 });
            }
        }, 1000); // 1-second network latency simulation
    });
}

// Option A: Using Promises with .then() and .catch()
console.log("Starting Promise chain demo...");
mockFetchProductPrice("8111")
    .then((result) => {
        console.log("Promise Success Price:", result.price);
    })
    .catch((error) => {
        console.error("Promise Failed Error:", error.message);
    });

// Option B: Using Async/Await with Try-Catch (Cleanest & Modern Standard)
async function getPriceDemo() {
    console.log("\nStarting Async/Await demo...");
    try {
        const result = await mockFetchProductPrice("8111");
        console.log("Async/Await Success Price:", result.price);
    } catch (error) {
        console.error("Async/Await Failed Error:", error.message);
    }
}

// Triggering the demo after the promise chain
setTimeout(getPriceDemo, 1200);


console.log("\n=== Lesson 2: Service Error Handling & Fallback logic ===");

// Simulating a route controller that displays product info on a page.
// If the price service crashes, we want a fallback price (e.g. read from local database or show "Contact for Price") 
// instead of returning a 500 error page.

async function renderProductPageController(productId) {
    console.log(`\n[Controller] Starting rendering sequence for product ${productId}...`);
    let priceDetails;
    
    try {
        // Attempt to fetch live pricing from ERP system
        priceDetails = await mockFetchProductPrice(productId);
    } catch (error) {
        // Fallback Logic: Log the error and use a fallback catalog price
        console.warn(`[WARNING] Service call failed: "${error.message}". Activating pricing fallback.`);
        priceDetails = {
            productId: productId,
            price: 299.99, // Fallback base price
            isFallback: true
        };
    }

    console.log(`[Controller] Page rendered. Product price to display: $${priceDetails.price} ${priceDetails.isFallback ? '(Fallback Active)' : '(Live Price)'}`);
}

// Test cases:
setTimeout(() => {
    // 1. Success case
    renderProductPageController("8111");
}, 2500);

setTimeout(() => {
    // 2. Failure case (will activate fallback)
    renderProductPageController("9999");
}, 4000);
