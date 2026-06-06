# JavaScript & Express.js — Hands-On Learning Curriculum

A structured, hands-on curriculum for learning **JavaScript**, **Node.js**, and **Express.js** from the ground up. Includes concept lessons, interactive exercises with test assertions, and a fully working web server that demonstrates real-world backend patterns.

---

## 📋 Prerequisites

- Basic programming knowledge (any language)
- [Node.js](https://nodejs.org/) v16 or higher installed
- A code editor (VS Code recommended)
- A terminal / command line

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd js-interview-prep

# 2. Install dependencies
npm install

# 3. Run any concept lesson
node 01_basics/01_variables_scoping.js

# 4. Start the live web server
npm start
# Then open http://localhost:3000 in your browser
```

---

## 📚 Curriculum Structure

The curriculum is split into 3 progressive modules. Each file is self-contained with detailed comments explaining every concept.

### Module 1: Core JavaScript Fundamentals (`01_basics/`)

| # | File | Topics Covered |
|---|------|----------------|
| 1 | [01_variables_scoping.js](01_basics/01_variables_scoping.js) | `var` vs `let` vs `const`, function scope vs block scope, hoisting, the Temporal Dead Zone (TDZ), `Object.freeze()` |
| 2 | [02_objects_arrays.js](01_basics/02_objects_arrays.js) | Reference vs value copy, shallow vs deep cloning, optional chaining (`?.`), nullish coalescing (`??`), `map`, `filter`, `reduce` |
| 3 | [03_functions_closures.js](01_basics/03_functions_closures.js) | Function declarations vs expressions vs arrow functions, `this` binding, callbacks, closures, private state |

### Module 2: Advanced JS & Server-side Patterns (`02_advanced/`)

| # | File | Topics Covered |
|---|------|----------------|
| 4 | [04_modules_factories.js](02_advanced/04_modules_factories.js) | CommonJS modules (`require` / `module.exports`), the Factory pattern, building decorated model objects |
| 5 | [05_async_services.js](02_advanced/05_async_services.js) | Promises, `.then()` / `.catch()`, `async/await`, `try/catch`, service fallback strategies |

### Module 3: Web Server Development (`03_express_sfcc/`)

This module is a **live Express.js web server** you can run and interact with in your browser. It demonstrates real backend architecture patterns including controllers, middleware chains, service integrations, template rendering, and form security.

| # | File | Topics Covered |
|---|------|----------------|
| 6 | [app.js](03_express_sfcc/app.js) | Express app setup, middleware registration order, EJS template engine, global error handling |
| 7 | [06_controllers_routes.js](03_express_sfcc/06_controllers_routes.js) | Route handlers, query/param processing, async controller patterns, template rendering |
| 8 | [07_route_overrides.js](03_express_sfcc/07_route_overrides.js) | Middleware as prepend/append decorators, injecting data into response context |
| 9 | [08_services_logging.js](03_express_sfcc/08_services_logging.js) | Mock database services, simulated API failures, writing structured logs to disk |
| 10 | [09_forms_csrf.js](03_express_sfcc/09_forms_csrf.js) | Form processing, input validation, session management, CSRF token protection |

---

## 🗺️ Mapping Express.js to SFCC (SFRA)

Salesforce Commerce Cloud uses a framework called **SFRA (Storefront Reference Architecture)** which runs server-side JavaScript. If you're learning for an eCommerce role, here's how the concepts translate:

| Express.js Concept | SFCC (SFRA) Equivalent | Description |
|---|---|---|
| **Routing / Controllers** | `routes/` & `controllers/` | Files that map a URL (e.g., `/Product-Show`) to JS logic. |
| **Middlewares / Request Hooks** | Route Appending / Prepending | Running code before or after the main controller action. |
| **EJS Templates (`.ejs`)** | ISML Templates (`.isml`) | Server-side templates that inject dynamic data into HTML. |
| **Route/Template Decorators** | Template Decorators | A layout wrapper (header, footer, nav) that wraps main page content. |
| **`ejs` local/remote include** | Local / Remote Includes | Importing reusable code/HTML blocks into a template. |
| **CommonJS Modules (`require()`)** | Scripts & Script Modules | Reusable JS utility files, models, and classes imported across components. |
| **`fetch()` / Mock Services** | Service Framework (`dw.svc.*`) | Fetching data from external systems with timeout and error handling. |
| **Winston / File Logger** | System Log Files (`customerror-*`) | Checking physical logs on the server to diagnose production bugs. |
| **Express Session / Cookies** | Session (`session`) & Customer | Managing user logins, shopping carts, and tracking state. |

---

## ✏️ Exercises

The `exercises/` folder contains 4 hands-on challenges that test the concepts from the lessons. Each file includes built-in assertion tests — when you solve a task correctly, you'll see ✅ in your terminal.

### How to Work Through Exercises

1. **Read the instructions** in the comments above each task
2. **Write your solution** where indicated by `// TODO` markers
3. **Run the file** to check your work:
   ```bash
   node exercises/01_basics_exercise.js
   ```
4. **Fix until all assertions pass** — look for ✅ `[PASS]` or ❌ `[FAIL]` output
5. **If stuck**, check the corresponding file in `solutions/` — but try to understand *why* the solution works

### Exercise Files

| Exercise | Focus Area | Run Command |
|----------|------------|-------------|
| [01_basics_exercise.js](exercises/01_basics_exercise.js) | Scoping bugs, safe property access, deep cloning, array transformations | `node exercises/01_basics_exercise.js` |
| [02_async_exercise.js](exercises/02_async_exercise.js) | Async/await resolution, try-catch error handling, service fallbacks | `node exercises/02_async_exercise.js` |
| [03_express_exercise.js](exercises/03_express_exercise.js) | Express middleware, route handlers, form validation (runs a server) | `node exercises/03_express_exercise.js` |
| [04_code_comprehension.js](exercises/04_code_comprehension.js) | Read-only interview prep — analyze code snippets and answer questions | Read & reason (no code to run) |

### Solutions

Solutions are in the `solutions/` folder. Each file corresponds to an exercise:

| Solution | Run Command |
|----------|-------------|
| [01_basics_solution.js](solutions/01_basics_solution.js) | `node solutions/01_basics_solution.js` |
| [02_async_solution.js](solutions/02_async_solution.js) | `node solutions/02_async_solution.js` |
| [03_express_solution.js](solutions/03_express_solution.js) | `node solutions/03_express_solution.js` |
| [04_code_comprehension_sol.js](solutions/04_code_comprehension_sol.js) | Read & compare answers |

---

## 🌐 Running the Live Web Server

Module 3 includes a fully interactive Express web server with a dark-themed UI:

```bash
npm start
# Server starts at http://localhost:3000
```

### Available Pages

| Page | URL | What It Demonstrates |
|------|-----|---------------------|
| **Home** | `/` | Overview dashboard with links to all features |
| **Product Detail** | `/product/8111` | Dynamic route params, async service calls, fallback pricing, promo banner injection |
| **Product Error** | `/product/1234` | Error handling when a product ID doesn't exist |
| **Checkout** | `/checkout` | Form validation, CSRF token protection, session management |

### Things to Try
- Visit `/product/8111` and observe the promotional banner injected via middleware
- Visit `/product/1234` to see how the server handles missing products
- Submit the checkout form with invalid data to see validation errors
- Click "Simulate Attack" on the checkout page to see CSRF protection in action
- Watch the `logs/` directory for live log entries: `tail -f logs/custom-errors.log`

---

## 📂 Project Structure

```
js-interview-prep/
├── 01_basics/                  # Module 1: Core JS concepts
│   ├── 01_variables_scoping.js
│   ├── 02_objects_arrays.js
│   └── 03_functions_closures.js
├── 02_advanced/                # Module 2: Advanced patterns
│   ├── 04_modules_factories.js
│   └── 05_async_services.js
├── 03_express_sfcc/            # Module 3: Live Express server
│   ├── app.js                  # Server entry point
│   ├── 06_controllers_routes.js
│   ├── 07_route_overrides.js
│   ├── 08_services_logging.js
│   ├── 09_forms_csrf.js
│   └── views/                  # EJS templates
├── exercises/                  # Hands-on coding challenges
├── solutions/                  # Reference solutions
├── logs/                       # Generated server logs
└── package.json
```

---

## 📜 License

MIT — feel free to use, modify, and share.
