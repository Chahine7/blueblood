
# BlueBlood Application

BlueBlood is a full-stack application consisting of a Spring Boot backend and an Angular frontend. This application allows users to:

- Create an account
- Log in to their account
- Create, modify, and delete tasks

Both backend and frontend services are containerized using Docker, and the deployment is orchestrated using Docker Compose.

## Features

### Backend (Spring Boot)

- Built with Java Spring Boot.
- Provides RESTful APIs for user authentication and task management.
- Includes Java unit tests for critical functionality (note: not all components are covered).

### Frontend (Angular)

- Developed using Angular framework.
- UI components styled and managed with PrimeNG.

## Prerequisites

- Docker
- Docker Compose
- Java Development Kit (JDK) and Node.js (if running locally without Docker)

## How to Deploy with Docker Compose

1. Clone the repository:

   ```bash
   git clone https://github.com/Chahine7/blueblood.git
   cd blueblood
   ```

2. Build and start the services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will build the images and start both the backend and frontend services.

3. Access the application:

   - Frontend: [http://localhost:4200](http://localhost:4200)
   - Backend API: [http://localhost:8080](http://localhost:8080)

## Docker Image Details

The following Docker images are used in the deployment:

- **Backend Image**: `11098078/blueblood-api`
- **Frontend Image**: `11098078/blueblood`

These images are built using the provided Dockerfile in the respective directories:

- `backend/Dockerfile`
- `frontend/Dockerfile`

### Steps to Deploy with Pre-built Images

1. Pull the pre-built images:

   ```bash
   docker pull 11098078/blueblood-api
   docker pull 11098078/blueblood
   ```

2. Start the services using Docker Compose:

   ```bash
   docker-compose up
   ```

3. Access the application:

   - Frontend: [http://localhost:4200](http://localhost:4200)
   - Backend API: [http://localhost:8080](http://localhost:8080)

## Local Development (Without Docker)

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend/TaskManagement
   ```

2. Build and run the Spring Boot application:

   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend/task-manager
   ```

2. Install dependencies and start the Angular development server:

   ```bash
   npm install
   ng serve
   ```

3. Access the frontend at [http://localhost:4200](http://localhost:4200).

## Testing

### Backend Unit Tests

Run the unit tests for the backend by executing:

```bash
./mvnw test
```

## Technologies Used

### Backend

- Spring Boot
- Spring Data JPA
- Spring Security
- JUnit (for unit testing)

### Frontend

- Angular
- PrimeNG (UI components)

## Tools

- Docker
- Docker Compose
