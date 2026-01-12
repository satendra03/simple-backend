# Simple Backend Project

A robust and modular RESTful API backend built with **Node.js**, **Express**, and **TypeScript**. This project serves as a foundation for an e-commerce platform, featuring authentication, product management, user profiles, and cart functionality.

## 🚀 Features

- **Modular Architecture**: Codebases organized by feature modules (`auth`, `product`, `user`, `cart`) for better maintainability.
- **Type Safety**: Fully written in TypeScript.
- **Authentication & Authorization**:
  - Secure User Authentication (Login/Signup) using JWT.
  - Role-Based Access Control (RBAC) with Admin middlewares.
- **Product Management**: Full CRUD operations for products.
- **Cart Management**: Shopping cart logic for users.
- **Database Integration**: Integrated with Firebase (via `firebase-admin`).
- **Validation**: Request data validation using custom validators.
- **Security**:
  - Password hashing with `bcrypt`.
  - Secure headers and CORS configuration.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Firebase](https://firebase.google.com/)
- **Tools**:
  - `nodemon` for development hot-reloading.
  - `tsc-alias` for path alias resolution.
  - `dotenv` for environment variable management.

## 📂 Project Structure

The project follows a modular structure where each feature is self-contained:

```
src/
├── config/         # Configuration files (Firebase, etc.)
├── middlewares/    # Global middlewares (Auth, Admin, Error handling)
├── modules/        # Feature modules
│   ├── auth/       # Authentication logic
│   ├── cart/       # Cart management
│   ├── product/    # Product catalog
│   └── user/       # User management
├── shared/         # Shared resources
├── utils/          # Utility functions (JWT helpers, etc.)
├── app.ts          # Express app setup
├── server.ts       # Server entry point
└── routes.ts       # Central route registration
```

Each module typically contains:

- `controller`: Handles incoming requests and sends responses.
- `service`: Contains business logic.
- `repository`: Handles database interactions.
- `model`: Defines data models.
- `route`: Defines API endpoints for the module.

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Firebase Project**: You need a Firebase project with service account credentials.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/satendra03/simple-backend.git
    cd simple-backend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    PORT=5000

    JWT_ACCESS_SECRET=your_jwt_access_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    DB_ADMIN_KEY=your_db_admin_key
    ```

### Running the Application

- **Development Mode** (with hot-reload)

  ```bash
  npm run dev
  ```

- **Build for Production**

  ```bash
  npm run build
  ```

- **Start Production Server**
  ```bash
  npm start
  ```

## 🔌 API Endpoints

### Authentication (`/auth`)

- `POST /auth/signup` - Register a new user
- `GET /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user

### Products (`/products`)

- `GET /` - Get all products
- `GET /:productId` - Get a single product
- `POST /` - Create a product (Admin only)
- `PATCH /:productId` - Update a product (Admin only)
- `DELETE /:productId` - Delete a product (Admin only)

_(Other modules like `/users` and `/cart` follow similar patterns)_

## 📝 License

This project is licensed under the ISC License.
