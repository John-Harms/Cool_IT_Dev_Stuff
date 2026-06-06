/**
 * Module 3 - Topic 3: Logging & Integrations (Services)
 * 
 * 💡 CONTEXT FOR THE INTERVIEW:
 * When integrations fail, you don't have a debugger attached to production.
 * You rely entirely on logs. SFCC writes logs to specific files. We simulate
 * this by using Node's 'fs' module to append formatted log entries to disk.
 */

const fs = require('fs');
const path = require('path');

// Ensure log directory exists
const LOG_DIR = path.join(__dirname, '../logs');
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

// ----------------------------------------------------
// 📁 Log Writer Utility
// ----------------------------------------------------
/**
 * Writes logs to a file in a standard formatted string
 * @param {string} filename Name of the log file (e.g. 'custom-error.log')
 * @param {string} level Log level: INFO, WARN, ERROR
 * @param {string} category Category of error (e.g. 'ERP_SERVICE')
 * @param {string} message Description of event
 */
function log(filename, level, category, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] [${category}] - ${message}\n`;
    
    // Append asynchronously to the log file on disk
    fs.appendFile(path.join(LOG_DIR, filename), logMessage, (err) => {
        if (err) console.error("CRITICAL: Failed to write to log file:", err.message);
    });

    // Also echo to console for visibility
    console.log(`Log Recorded: ${logMessage.trim()}`);
}

// ----------------------------------------------------
// 🔌 Simulated Services (ERP & Catalog DB)
// ----------------------------------------------------
const mockProductDatabase = {
    "8111": {
        id: "8111",
        name: "Iron Ranger",
        price: 349.99,
        inStock: true,
        stockCount: 8,
        description: "The Iron Ranger is an American icon that is beloved for its standout style and long-lasting construction. Built with a double layer leather toe cap, chrome hardware, and a Vibram sole."
    },
    "875": {
        id: "875",
        name: "Classic Moc",
        price: 319.99,
        inStock: true,
        stockCount: 3,
        description: "The Classic Moc is the cornerstone of the Heritage line. Crafted with durable leather, traction tred sole, and iconic moc-toe stitching."
    }
};

/**
 * Fetches basic product information from the catalog database
 */
function getCatalogProduct(id) {
    const product = mockProductDatabase[id];
    if (!product) {
        log('custom-errors.log', 'WARN', 'CATALOG', `Attempted to fetch invalid product ID: ${id}`);
        return null;
    }
    // Return a shallow copy to prevent controllers from mutating the shared database object.
    // (Remember Module 1's lesson on reference vs. value copies!)
    return { ...product };
}

/**
 * Simulates fetching dynamic inventory prices from an external ERP API.
 * Contains timeouts and random failure vectors for debugging.
 */
async function fetchPriceFromERP(productId) {
    return new Promise((resolve, reject) => {
        log('service.log', 'INFO', 'ERP_SERVICE', `Initiated request to ERP for product ${productId}`);
        
        // Simulating 500ms network connection delay
        setTimeout(() => {
            if (productId === "9999" || productId === "1234") {
                const errMsg = `ERP Connection Timeout - Server at 192.168.10.45 failed to respond in 3000ms.`;
                log('custom-errors.log', 'ERROR', 'ERP_SERVICE', errMsg);
                reject(new Error(errMsg));
            } else {
                const product = mockProductDatabase[productId];
                if (product) {
                    resolve(product.price);
                } else {
                    reject(new Error(`Product ${productId} not found in ERP records.`));
                }
            }
        }, 500);
    });
}

module.exports = {
    log: log,
    getCatalogProduct: getCatalogProduct,
    fetchPriceFromERP: fetchPriceFromERP
};
