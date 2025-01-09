
# BlueBlood Application

BlueBlood is a full-stack task management application with a **Spring Boot backend** and an **Angular frontend**. The application allows users to register, log in, and manage tasks (create, modify, and delete).

---

## How to Run the Application

### Prerequisites

Ensure you have the following installed:

- **Docker**  
- **Docker Compose**  
- **Java Development Kit (JDK)** (if running the backend locally)  
- **Node.js** (if running the frontend locally)

### Using Docker Compose (Recommended)

1. Clone the repository:  
   ```bash
   git clone https://github.com/Chahine7/blueblood.git
   cd blueblood
   ```

2. Build and start the services:  
   ```bash
   docker-compose up --build
   ```

3. Access the application:  
   - **Frontend**: [http://localhost:4200](http://localhost:4200)  
   - **Backend API**: [http://localhost:8080](http://localhost:8080)

### Running Locally (Without Docker)

#### Backend

1. Navigate to the backend directory:  
   ```bash
   cd backend/TaskManagement
   ```

2. Build and run the Spring Boot application:  
   ```bash
   ./mvnw spring-boot:run
   ```

The backend API will be available at [http://localhost:8080](http://localhost:8080).

#### Frontend

1. Navigate to the frontend directory:  
   ```bash
   cd frontend/task-manager
   ```

2. Install dependencies and start the Angular development server:  
   ```bash
   npm install
   ng serve
   ```

The frontend will be accessible at [http://localhost:4200](http://localhost:4200).

---

## Backend APIs

The following RESTful APIs are implemented in the backend:

1. **User Management APIs**  
   - `POST /api/auth/register`: Register a new user.  
   - `POST /api/auth/login`: Authenticate and obtain a token.

2. **Task Management APIs**  
   - `GET /api/tasks`: Retrieve all tasks for the logged-in user.  
   - `POST /api/tasks`: Create a new task.  
   - `PUT /api/tasks/{id}`: Update an existing task.  
   - `DELETE /api/tasks/{id}`: Delete a task.

---

## Frontend Features

The frontend provides the following features:

- **User Authentication**  
  - Register a new account.  
  - Log in to the application.

- **Task Management**  
  - Create, modify, and delete tasks.  
  - View a list of tasks in a user-friendly UI.  

The frontend uses **PrimeNG** for rich UI components.

---

## Assumptions and Trade-offs

1. **Authentication**:  
   - Simple token-based authentication is implemented. Advanced features like token refresh or OAuth are not included for simplicity.
   
2. **Testing**:  
   - The backend includes unit tests for core functionality, but not all components are fully covered.
   
3. **Frontend Design**:  
   - PrimeNG is used for styling and UI components to speed up development and ensure a consistent look.

---

## Technologies Used

### Backend
- Spring Boot  
- Spring Data JPA  
- Spring Security  
- JUnit (for unit testing)

### Frontend
- Angular  
- PrimeNG  

### Tools
- Docker  
- Docker Compose
