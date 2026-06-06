/**
 * Solution - Exercise 2: Asynchronous JS and API Service Fallbacks
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../logs/custom-errors.log');
function logError(message) {
    const logMessage = `[${new Date().toISOString()}] [ERROR] [MOCK_SVC] - ${message}\n`;
    if (!fs.existsSync(path.dirname(LOG_FILE))) {
        fs.mkdirSync(path.dirname(LOG_FILE));
    }
    fs.appendFileSync(LOG_FILE, logMessage);
}

function mockGetExternalCatalog(storefrontId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (storefrontId === "us-store") {
                resolve([
                    { id: "8111", stock: 12 },
                    { id: "875", stock: 4 }
                ]);
            } else {
                reject(new Error("Database Connection Reset (503 Service Unavailable)"));
            }
        }, 300);
    });
}

// ----------------------------------------------------
// 🛠️ Task 1 Solution: Fix Async Execution Resolution
// ----------------------------------------------------
// FIX: Added 'await' before calling mockGetExternalCatalog() to wait for the resolution.
async function getStockController(storefrontId) {
    const result = await mockGetExternalCatalog(storefrontId);
    return result;
}


// ----------------------------------------------------
// 🛠️ Task 2 Solution: Implement Try-Catch and Service Fallback
// ----------------------------------------------------
// FIX: Wrapped the call in a try/catch. If the API fails, log it to disk and return fallback array.
async function getStockWithFallbackController(storefrontId) {
    try {
        const result = await mockGetExternalCatalog(storefrontId);
        return result;
    } catch (error) {
        // 1. Log the error to the log file on disk
        logError(error.message);
        
        // 2. Return the custom fallback array
        return [{ id: "fallback-default", stock: 0 }];
    }
}


// Verification test run
async function verify() {
    console.log("Running Verification Stock Check:");
    const stockResult = await getStockController("us-store");
    console.log("Stock Resolved (US):", stockResult);

    console.log("\nRunning Verification Fallback & Log Check:");
    const stockFallback = await getStockWithFallbackController("eu-store");
    console.log("Stock Resolved (EU - Fallback active):", stockFallback);
    console.log("Logs updated. Check logs/custom-errors.log file!");
}

verify();
