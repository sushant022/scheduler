# Class Scheduler Backend

This is a backend service for a class scheduler application built using **Node.js**, **Express**, and **MongoDB**. The application allows users (students, teachers, and admins) to register, log in, and manage class schedules. The backend is containerized using Docker, and the project is managed with Docker Compose.

## 2. Environment Configuration

The project uses environment variables for database connection and authentication. You can store these variables in a `.env` file (optional) or manage them directly in the `docker-compose.yml` file.

### Option 1: Using a `.env` file

Create a `.env` file in the root of the project and add the following content:

```bash
MONGO_URI=mongodb://mongo:27017/classSchedulerDB
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

## 3. Build and Start the Containers

To start the project, use Docker Compose. This will build the backend Node.js application and set up a MongoDB database service.

### Run the following command:

```bash
docker-compose up --build
```
- This command will:
    - Build and start the app (Node.js) and mongo (MongoDB) containers.
    - Expose the Node.js backend on http://localhost:5000.
    - Expose MongoDB on localhost:27017 with the database classSchedulerDB.

# 4. Stop the Project
To stop the running containers, use the following command:

```bash
docker-compose down
```
This will stop and remove the containers, but it will not delete the database data, which is stored in a volume.

# 5. Remove Containers and Volumes (Optional)
If you want to completely remove the containers and delete the MongoDB data, use this command:

```bash
docker-compose down --volumes
```
This will remove the containers and associated volumes, deleting all MongoDB data.

# 6. Logs and Debugging
To view the logs for both the app and mongo services, use this command:

```bash
docker-compose logs -f
```
This will display real-time logs for both services, helping you troubleshoot any issues.

# 7. Clean Build (Optional)
If you want to force a complete rebuild of the project, including removing containers, images, volumes, and orphaned containers, use this command:

```bash
docker-compose down --rmi all --volumes --remove-orphans
docker-compose up --build
```
This will rebuild everything from scratch, including downloading fresh base images.

# Endpoints
Here are the main API endpoints that the backend exposes:

- POST /api/auth/register: Register a new user (student, teacher, or admin).

- Request Body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "student/teacher/admin"
}
```

- POST /api/auth/login: Log in a user and return a JWT token.
- Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

- POST /api/classes/create: Create a new class (admin/teacher only).

- Request Body:
```json
{
  "title": "string",
  "description": "string",
  "teacher": "teacher_id",
  "timeSlot": "string"
}
```

- POST /api/classes/
/enroll: Enroll a student in a class.
    - Request Params: classId (the ID of the class to enroll in)

- GET /api/classes: Get a list of all available classes.

# Docker Compose Services
The docker-compose.yml file defines two main services:

- app: The Node.js backend service for handling API requests.
- mongo: The MongoDB database service to store application data.

## Docker Compose Configuration:
```yaml
version: '3.8'
services:
  app:
    container_name: class-scheduler-app
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/classSchedulerDB
      - JWT_SECRET=your_jwt_secret_here
      - PORT=5000
    depends_on:
      - mongo
    volumes:
      - .:/app
    restart: always

  mongo:
    container_name: mongodb
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: always

volumes:
  mongo-data:
```

## Explanation:
- app:
    - Runs the Node.js backend server.
    - Exposes port 5000 on the host machine.
    - Connects to the MongoDB service using the MONGO_URI environment variable.
- mongo:
    - Runs the MongoDB service on port 27017.
    - Persists data using the mongo-data volume, ensuring data is retained across container restarts.

## Troubleshooting
- If you encounter build or runtime errors, make sure that Docker is running and properly installed.
- Ensure that ports 5000 (for the app) and 27017 (for MongoDB) are not in use by other services.
- If you need to rebuild the images, use:
```bash
docker-compose down --rmi all --volumes --remove-orphans
docker-compose up --build
```
This will force a clean rebuild of the project.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

