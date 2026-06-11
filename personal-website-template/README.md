# Express MVC Starter Template

This repository contains a ready-to-use `package.json` file populated with all the necessary dependencies to build a robust **Model-View-Controller (MVC)** web application using Node.js and Express.

Since you want to build this website on your own and learn along the way, this document explains the purpose of each dependency and suggests a standard MVC folder structure.

---

## 🚀 Getting Started

Follow these steps while you are still online to download all packages:

1. **Open your terminal** and navigate to this folder:
   ```bash
   cd personal-website-template
   ```
2. **Install all dependencies** (this will download them to `node_modules` so they are fully cached and available offline):
   ```bash
   npm install
   ```
3. **Start the development server** (once you've created a basic `server.js` file):
   ```bash
   npm run dev
   ```

---

## 📦 What's Included (Dependency Breakdown)

Here is a breakdown of the packages configured in your `package.json`:

### 1. Core Framework & Templating (V)
* **`express`**: The fast, unopinionated, minimalist web framework for Node.js.
* **`ejs`**: Embedded JavaScript templates. Allows you to write standard HTML injected with dynamic JavaScript variables.
* **`express-ejs-layouts`**: Enables layout support for EJS so you don't have to repeat headers/footers on every page.
* **`method-override`**: Allows you to use HTTP verbs like `PUT` or `DELETE` in HTML forms (which natively only support `GET` and `POST`).

### 2. Database & Models (M)
* **`sqlite3` & `sequelize`**: Sequelize is an ORM (Object-Relational Mapping) framework. It paired with SQLite3 is perfect for offline local development as SQLite stores the database in a local file (no external server installation required).
* **`mongoose`**: An ODM (Object Data Modeling) library for MongoDB, in case you decide to use a MongoDB database later.

### 3. Middleware & Utilities (C)
* **`dotenv`**: Loads environment variables from a `.env` file into `process.env`. Essential for storing keys and configurations locally without committing them to git.
* **`morgan`**: An HTTP request logger middleware. Great for seeing incoming requests and their response status codes in the terminal.
* **`cors`**: Middleware to enable/configure Cross-Origin Resource Sharing.
* **`cookie-parser`**: Parses Cookie headers and populates `req.cookies`.
* **`express-session` & `connect-flash`**: Used for managing user sessions and sending temporary "flash" messages (e.g. success/error alerts after redirects).
* **`express-validator`**: A set of express.js middlewares for validating and sanitizing user input (e.g. form submissions).
* **`multer`**: Middleware for handling `multipart/form-data`, primarily used for uploading files (like profile pictures).

### 4. Security & Authentication
* **`bcryptjs`**: Used to hash passwords securely before saving them to your database.
* **`jsonwebtoken`**: For generating and verifying JSON Web Tokens (useful for stateless API authentication).
* **`helmet`**: Secures your Express apps by setting various HTTP headers.
* **`compression`**: Gzip compression middleware to improve performance and speed up response delivery.

### 5. Development Tools
* **`nodemon`**: Automatically restarts your node application when file changes in the directory are detected. Runs via `npm run dev`.

---

## 🗂 Recommended MVC Folder Structure

For a clean MVC architecture, we recommend organizing your files like this:

```text
personal-website-template/
├── config/
│   └── database.js      # Database connection & Sequelize configuration
├── controllers/
│   ├── homeController.js # Handles main pages (home, about, contact)
│   └── authController.js # Handles signup, login, logout
├── models/
│   └── User.js          # User schema/model definition
├── routes/
│   ├── index.js         # Main router mapping endpoints to controllers
│   └── auth.js          # Authentication routes
├── views/
│   ├── layouts/
│   │   └── layout.ejs   # Main wrapper template (header, footer, nav)
│   ├── partials/
│   │   └── footer.ejs   # Footer partial template
│   ├── pages/
│   │   ├── home.ejs     # Home page content
│   │   └── about.ejs    # About page content
│   └── login.ejs        # Login page template
├── public/              # Static files (accessible to browser)
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── .env                 # Environment variables (do not commit to GitHub!)
├── .gitignore
├── package.json
└── server.js            # Entry point of your application
```

### 📂 Directory Breakdown & Separation of Concerns

This directory structure implements the **Model-View-Controller (MVC)** design pattern. It enforces a **Separation of Concerns (SoC)**, ensuring that data storage logic, user interface layouts, and application flow/routes are kept isolated from one another.

Here is what each folder should contain and why they are separated:

1. **`config/`**
   * **What it contains:** Database connection setups (e.g. database connection pools or ORM/ODM setups), third-party API clients, and application-wide environments configuration.
   * **Why it works:** Centralizing configuration prevents repeating connection strings and credential logic. If you switch databases or update keys, you only edit code in one place.

2. **`models/` (The "M" in MVC)**
   * **What it contains:** The definitions of your database schemas, tables, and validation rules (e.g., `User.js`, `Project.js`).
   * **Why it works:** Models encapsulate the structure and state of your data. Keeping them isolated prevents database queries or validations from cluttering your page layouts or route handlers.

3. **`views/` (The "V" in MVC)**
   * **What it contains:** Your HTML template files (in this case, EJS templates, layouts, and reusable components like headers or footers).
   * **Why it works:** Views handle the user interface (UI). By isolating them, you can redesign page layouts or switch templates entirely without risking modifications to data storage or request routing.

4. **`controllers/` (The "C" in MVC)**
   * **What it contains:** The business logic functions that receive HTTP requests, fetch/manipulate data using models, and return appropriate responses (rendering a view page or returning API JSON data).
   * **Why it works:** Controllers act as the glue or bridge. They keep the core logic out of route files and layout files, resolving questions like "what data does this page need to render?"

5. **`routes/`**
   * **What it contains:** File definitions that map specific URLs and HTTP methods (e.g., `GET /login`, `POST /login`) to the corresponding controller handler functions.
   * **Why it works:** It acts as a table of contents or router address book. It is easy to check at a glance which URL patterns are supported by your web app, keeping entry files like `server.js` short and clean.

6. **`public/`**
   * **What it contains:** Static front-end assets served directly to the browser (stylesheets, browser JavaScript files, favicon, icons, images, and audio/video files).
   * **Why it works:** It keeps static files separated from server-rendered dynamic files. Express can serve assets in `public/` directly, optimizing asset loading times.

---

### 🏷 Naming Conventions & Why They Work

Structuring your directory is only half the battle; establishing clear naming conventions makes the codebase predictable and easy to navigate:

1. **Plural Directory Names (`controllers/`, `models/`, `routes/`, `views/`)**
   * **Convention:** Lowercase, plural nouns.
   * **Why it works:** These directories hold collections of files. Standardizing on plural names distinguishes them from utility or configuration directories like `config/` or `public/` which are singular conceptual buckets.

2. **Models in PascalCase & Singular (`User.js`)**
   * **Convention:** Capitalized first letter, singular form.
   * **Why it works:** In Object-Oriented Programming and database schemas, models represent a blueprint (a Class) for a single entity (representing a single row/document). Instantiating a new entity looks like `const user = new User()`. Singular PascalCase maps directly to class instantiation.

3. **Controllers with a Suffix (`homeController.js`, `authController.js`)**
   * **Convention:** camelCase, suffixed with `Controller.js`.
   * **Why it works:** It prevents namespace collisions and search confusion. If you have a `User` model, a `users` route, and a `userController`, you can instantly identify each file in your code editor's fuzzy search by its suffix.

4. **Routes in Lowercase/Plural (`auth.js`, `users.js`)**
   * **Convention:** Lowercase, typically matching the API endpoint resource name.
   * **Why it works:** They directly correlate to the web URLs (e.g. `/auth/login`, `/users/profile`). Using lowercase prevents casing issues when deploying to case-sensitive filesystems (like Linux staging/production servers) from case-insensitive ones (like macOS or Windows dev machines).

5. **Views Organization (`views/layouts/`, `views/partials/`, `views/pages/`)**
   * **Convention:** Lowercase, structured by their template role.
     * **`layouts/`** holds the structural wrappers (header/footer blocks).
     * **`partials/`** holds modular, reusable components (e.g., footer, navigation menu).
     * **`pages/`** holds page-specific content.
   * **Why it works:** It prevents the root `views` directory from becoming cluttered, and makes it clear which views are full pages versus reusable components.

---

## 🛠 Simple Entry Point Example (`server.js`)

To get started offline, you can create a simple `server.js` in the root folder:

```javascript
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging Middleware
app.use(morgan('dev'));

// Static Files Folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as Templating Engine
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // default layout file
app.set('view engine', 'ejs');

// Parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('pages/home', { title: 'Home Page' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Happy coding! 💻✨
