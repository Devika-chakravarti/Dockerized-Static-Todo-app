# Docker Steps for ToDo App

1. Navigate to project folder:
   cd "C:\Users\devik\OneDrive\Desktop\ToDo-app"

2. Build Docker Image:
   docker build -t todo-frontend .

3. Run Docker Container:
   docker run -d -p 8080:80 todo-frontend

4. Access in browser:
   http://localhost:8080

5. Stop container (if needed):
   docker ps        → to get container ID
   docker stop <id>
