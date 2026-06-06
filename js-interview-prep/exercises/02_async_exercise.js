/**
 * Exercise 2: Asynchronous JS and API Service Fallbacks
 * 
 * 🏃‍♂️ TO RUN THIS FILE:
 *   node exercises/02_async_exercise.js
 * 
 * Fix the code in each section to make the assertions pass.
 */

const fs = require('fs');
const path = require('path');

// We use this tiny helper to test your outputs
function assert(name, condition, expected, actual) {
    if (condition) {
        console.log(`✅ [PASS] ${name}`);
    } else {
        console.error(`❌ [FAIL] ${name}\n   Expected: ${JSON.stringify(expected)}\n   Actual:   ${JSON.stringify(actual)}`);
    }
}

// Mock service logger helper
const LOG_FILE = path.join(__dirname, '../logs/custom-errors.log');
function logError(message) {
    const logMessage = `[${new Date().toISOString()}] [ERROR] [MOCK_SVC] - ${message}\n`;
    if (!fs.existsSync(path.dirname(LOG_FILE))) {
        fs.mkdirSync(path.dirname(LOG_FILE));
    }
    fs.appendFileSync(LOG_FILE, logMessage);
}

// ----------------------------------------------------
// 🔌 Simulated Catalog API Service (External)
// ----------------------------------------------------
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
// 🛠️ Task 1: Fix Async Execution Resolution
// ----------------------------------------------------
// This controller function is supposed to fetch stock and return it.
// Bug: It's currently returning '[object Promise]' or undefined because it fails 
// to wait for the asynchronous execution to finish before returning.
// Goal: Fix the async/await syntax so the function returns the actual stock array.

async function getStockController(storefrontId) {
    // TODO: Add correct async/await modifiers to resolve the promise.
    const result = mockGetExternalCatalog(storefrontId);
    return result;
}


// ----------------------------------------------------
// 🛠️ Task 2: Implement Try-Catch and Service Fallback
// ----------------------------------------------------
// Goal: Write a controller wrapper that calls mockGetExternalCatalog().
// If the service succeeds: Return the inventory array.
// If the service FAILS: 
//   1. Catch the exception.
//   2. Call logError(err.message) to write the incident to our logs on disk.
//   3. Return a fallback stock array: [{ id: "fallback-default", stock: 0 }] so the program doesn't crash.

async function getStockWithFallbackController(storefrontId) {
    // TODO: Implement error handling with try-catch
    // If the service succeeds: Return the inventory array.
    // If the service FAILS:
    //   1. Catch the exception.
    //   2. Call logError(err.message) to write the incident to our logs on disk.
    //   3. Return a fallback stock array: [{ id: "fallback-default", stock: 0 }]
    
    const result = mockGetExternalCatalog(storefrontId);
    return result;
}


// ----------------------------------------------------
// 🧪 Test Suite Runner
// ----------------------------------------------------
async function runTests() {
    console.log("Starting Async & Service Fallback Tests...\n");

    // Test 1 Verification
    try {
        const stockData = await getStockController("us-store");
        assert(
            "Task 1 - Async resolution (US Stock)",
            Array.isArray(stockData) && stockData[0]?.id === "8111",
            "Inventory Array with 8111",
            stockData
        );
    } catch (e) {
        console.error("Test 1 crashed: ", e.message);
    }

    // Test 2 Verification (Failure recovery)
    try {
        // Clearing previous logs to check if write happens
        if (fs.existsSync(LOG_FILE)) fs.unlinkSync(LOG_FILE);

        const stockDataFallback = await getStockWithFallbackController("eu-store"); // This will fail in service

        const logWritten = fs.existsSync(LOG_FILE) && fs.readFileSync(LOG_FILE, 'utf8').includes("503 Service Unavailable");

        assert(
            "Task 2a - Returns Fallback on error",
            stockDataFallback[0]?.id === "fallback-default",
            "[{ id: 'fallback-default', stock: 0 }]",
            stockDataFallback
        );

        assert(
            "Task 2b - Log file updated successfully",
            logWritten === true,
            "true (Log contains '503 Service Unavailable')",
            logWritten ? "Log written" : "Log file empty or missing message"
        );

    } catch (e) {
        console.error("Test 2 crashed: ", e.message);
    }
}

runTests();
