# 🏢 Awesome PV Management Backend

This project is the backend service for the **Awesome PV Management** platform, responsible for managing facilities, reports, and user data. It provides a GraphQL API for interacting with these entities, handling authentication, and ensuring data integrity and security.

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Installation](#-installation)
3. [Configuration](#-configuration)
4. [GraphQL API](#-graphql-api)
   - [Schema](#-schema)
   - [Queries](#-queries)
   - [Mutations](#-mutations)
5. [Services and Business Logic](#-services-and-business-logic)
   - [User Service](#user-service)
   - [Facility Service](#facility-service)
   - [Report Service](#report-service)
6. [Authentication](#-authentication)
7. [Error Handling](#-error-handling)
8. [Future Improvements](#-future-improvements)

## 📖 Overview

This backend application uses **Node.js** and **Express** with **GraphQL** to provide a robust API for managing photovoltaic (PV) facilities, generating reports, and handling user authentication. Data is stored in a **MongoDB** database, and the authentication is managed using JWT.

## 🚀 Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/noureldineessam/awesome-pv-management-backend.git
   ```

2. **Install dependencies:**

   ```bash
   cd awesome-pv-management-backend
   npm install
   ```

3. **Environment Configuration:**

   Set up your environment variables as defined in `config/environment.js`. Key variables include:

   - `PORT`: Port number for the server.
   - `MONGO_URL`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for JWT.

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on the configured port, defaulting to `http://localhost:3001`.

## 🔧 Configuration

Configuration details are managed through `config/environment.js`, where you set up database connections, server ports, and security keys.

## 📡 GraphQL API

The GraphQL API provides a structured way to query and mutate data. Here's an overview of the schema, key queries, and mutations available.

### 📐 Schema

The GraphQL schema is defined using `graphql-tools` and includes types for `User`, `Facility`, `Report`, and more. The type definitions are organized into `.graphql` files located in the `graphql/typedefs` directory.

### 🔍 Queries

1. **User Queries:**
   - `user(_id: ID!): User`: Fetch a user by ID.

2. **Facility Queries:**
   - `userFacilities: [Facility]`: Fetch all facilities associated with the authenticated user.
   - `facility(_id: ID!): Facility`: Fetch a specific facility by ID.

3. **Report Queries:**
   - `facilityReports(facilityId: ID!): [Report]`: Fetch all reports for a specific facility.
   - `report(_id: ID!): Report`: Fetch a specific report by ID.

### ✏️ Mutations

1. **User Mutations:**
   - `createUser(user: UserCreateInput!): User!`: Create a new user.
   - `updateUser(_id: ID!, user: UserUpdateInput!): User!`: Update user details.
   - `deleteUser(_id: ID!): Boolean!`: Delete a user.
   - `loginUser(email: String!, password: String!): AuthPayload`: Authenticate a user and return a JWT.

2. **Facility Mutations:**
   - `createFacility(facility: FacilityCreateInput!): Facility!`: Create a new facility.
   - `updateFacility(_id: ID!, facility: FacilityUpdateInput!): Facility!`: Update facility details.
   - `deleteFacility(_id: ID!): Boolean!`: Delete a facility.

3. **Report Mutations:**
   - `createReport(report: ReportCreateInput!, facilityId: ID!): Report!`: Create a new report for a facility.
   - `deleteReport(_id: ID!, facilityId: ID!): Boolean!`: Delete a report.

## 🛠️ Services and Business Logic

### User Service

The `UserService` handles operations related to user management, including:

- **User Authentication:** Uses bcrypt for password hashing and JWT for token generation.
- **CRUD Operations:** Create, read, update, and delete user information.

### Facility Service

The `FacilityService` manages PV facility data:

- **Facility Management:** Handles CRUD operations for facilities.
- **User-Facility Association:** Ensures that facilities are correctly associated with users.

### Report Service

The `ReportService` is responsible for generating and managing reports related to facility performance:

- **Report Generation:** Allows users to create detailed reports containing data points for their facilities.
- **Data Integrity:** Ensures that report data is accurate and belongs to the correct facility.

## 🔒 Authentication

Authentication is handled using JWTs, which are generated upon user login. The `authVerify` middleware checks for a valid JWT in the request headers to authenticate API requests.

## ⚠️ Error Handling

The backend uses structured error handling with meaningful logging. Errors are logged using a `logger` utility and returned in a format that provides information about the failure while maintaining security and privacy.

## 🚀 Future Improvements

1. **Enhanced Security:** Implement role-based access control (RBAC) for finer-grained permissions.
2. **Performance Optimization:** Optimize database queries and GraphQL resolvers for better performance.
3. **Scalability:** Implement a microservices architecture or serverless functions for specific heavy-load tasks.
4. **Monitoring and Logging:** Integrate with monitoring tools like Sentry for better observability.
