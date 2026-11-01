# 🍕 Restaurant App — React

Two React implementations of a restaurant website, built as part of a Semester 5 (JSF) project.

```
REACT_PROJECT/
├── restaurant_app/       # React frontend (Create React App)
└── restaurant_website/   # React frontend + Express backend
```

## 1️⃣ `restaurant_app`

A React frontend with reusable components, routing and context-based state.

```bash
cd restaurant_app
npm install
npm start
```

Runs on **http://localhost:3000**

**Structure**

```
src/
├── components/   # UI components
├── context/      # React context (state)
├── utils/        # Helpers
├── App.js
└── index.js
```

## 2️⃣ `restaurant_website`

A full-stack version: React frontend plus a Node/Express API with authentication and a database.

```bash
cd restaurant_website
npm install
npm run dev
```

`npm run dev` starts both the API server and the React dev server together using `concurrently`.

**Structure**

```
restaurant_website/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   └── css/
├── server.js        # Express API
├── public/
└── package.json
```

> The local SQLite file (`restaurant.db`) is not committed. Start the server once and it will be created automatically.

## 🛠 Tech Stack

| App | Stack |
|---|---|
| restaurant_app | React 18, react-router-dom, Create React App |
| restaurant_website | React 19, Express 5, sqlite3 / mysql2, JWT, bcrypt |

## 📌 Notes

- Original Semester 5 (JavaScript Frameworks) project.
- `node_modules/` and build output are not committed.
