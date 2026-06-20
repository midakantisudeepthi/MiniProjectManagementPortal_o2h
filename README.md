# TaskFlow | Task Management Portal

A full-stack Task Management Portal developed as a placement assessment project. Built with a robust Express/MySQL backend and a modern React + Bootstrap 5 frontend featuring dynamic theme support, real-time statistics, search, filtering, custom delete confirmations, and high-fidelity transitions.

---

## 🚀 Key Features

*   **Premium Glassmorphic UI:** A visually stunning layout using custom CSS variables, harmonies, micro-animations, and the *Outfit* and *Inter* Google fonts.
*   **Live Statistics Dashboard:** Cards summarizing Total, Pending, In Progress, and Completed tasks, automatically computed.
*   **Interactive Controls:** Filter tasks instantly by status or search tasks in real-time by title.
*   **Full CRUD Rest APIs:** Standardized endpoints with structured global error handlers and input schema validation.
*   **Custom Notifications System:** Lightweight, animated Toast alerts for creation, completions, and deletions.
*   **Confirm Delete Modal:** Inline modal checking delete requests to prevent accidental tasks loss.
*   **Dark Mode Toggle:** Smooth obsidian theme switch with user settings saved to local storage.

---

## 📁 Project Structure

```text
Task Flow/
├── backend/
│   ├── config/
│   │   └── db.js            # MySQL connection pool configuration
│   ├── controllers/
│   │   └── taskController.js # API Controller logic & validation
│   ├── models/
│   │   └── taskModel.js      # Raw SQL queries wrapper
│   ├── routes/
│   │   └── taskRoutes.js     # Express routes
│   ├── .env                 # Local variables (credentials, port)
│   ├── .env.example         # Template for environment settings
│   ├── package.json         # Node.js dependencies
│   ├── schema.sql           # Database schema migration
│   └── server.js            # Express API server entry-point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx            # Top Navigation with Dark Mode Toggle
    │   │   ├── StatsCards.jsx        # Real-time metrics
    │   │   ├── ConfirmationModal.jsx # Delete verify prompt
    │   │   └── ToastContainer.jsx    # Alert toast notifications Context
    │   ├── pages/
    │   │   ├── Dashboard.jsx         # Task lists, filters, actions
    │   │   └── AddTask.jsx           # Task creation form & validation
    │   ├── services/
    │   │   └── api.js                # Axios client configurations
    │   ├── App.jsx                   # Central layout & routing configuration
    │   ├── index.css                 # Style system, themes & animations
    │   └── main.jsx                  # React DOM mount script
    ├── index.html                    # Root index HTML with custom fonts
    ├── package.json                  # Web development configurations
    └── vite.config.js                # Vite configurations & proxy routing
```

---

## 🛠️ Installation & Setup

Follow these steps to run the application locally.

### 1. Database Configuration (MySQL)
1. Make sure your local MySQL server is running.
2. Log into your MySQL console and execute the schema:
   ```bash
   mysql -u root -p < backend/schema.sql
   ```
   *Alternatively, copy-paste the queries inside `backend/schema.sql` into MySQL Workbench or phpMyAdmin.*

### 2. Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file by copying the template:
   ```bash
   cp .env.example .env
   ```
4. Open the new `.env` file and adjust your database connection credentials (specifically your `DB_PASSWORD` and `DB_PORT` if they differ from the default).
5. Start the backend developer server:
   ```bash
   npm run dev
   ```
   *The server runs by default on `http://localhost:5000`.*

### 3. Frontend Web Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite developer server:
   ```bash
   npm run dev
   ```
   *The client server launches on `http://localhost:3000` and automatically opens a browser window.*

---

## 🔌 API Endpoints Documentation

| HTTP Method | Route | Description | Request Body Payload |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Returns all tasks. Accepts status query parameters, e.g. `?status=Pending`. | *None* |
| **POST** | `/api/tasks` | Creates a new task. | `{ "title": "...", "description": "...", "status": "Pending"\|"In Progress" }` |
| **PUT** | `/api/tasks/:id` | Updates task status. | `{ "status": "Completed"\|"Pending"\|"In Progress" }` |
| **DELETE** | `/api/tasks/:id` | Deletes a task. | *None* |

---

## 🧑‍💻 Assessment Highlights

*   **Separation of Concerns:** Controllers, Models, and Router modules are isolated. Validations are enforced in both the React UI and on the Express server level.
*   **Vite Proxy Configuration:** Avoids CORS issues by proxying dev client `/api` requests transparently to the Express server on port 5000.
*   **Zero-Dependency Notifications:** Built a customized React Context notification model, avoiding heavy bundles.
