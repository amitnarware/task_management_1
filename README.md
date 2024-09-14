
# Task_management
Task_management task
=======
1. Clone the Repository
Clone this repository to your local machine using Git.

git clone <repository-url>

2. Open the Project Folder
cd task_management

3. Create the MySQL Database
Create a MySQL database named task_management_db using the command line.

CREATE DATABASE task_management_db;

4. Install Dependencies      npm install

5. Run the Application
To start the server, use the following command:      npm start or node app.js


6. Insert Roles Data
Insert the predefined roles into the roles table using the MySQL CLI.
INSERT INTO roles (id, name) VALUES (1, 'Admin'), (2, 'User');

7. Swagger Documentation        http://localhost:3000/api-docs/#/


                       ADDITIONAL INFORMATION
Screenshots of Postman routes are available in the images folder.
Swagger documentation can be accessed via http://localhost:3000/api-docs/#/.

                            API Endpoints
9. User Registration
    Endpoint:
                   POST      http://localhost/api/auth/register

Example Request Body:

{
  "username": "Vinay",
  "email": "Vinay@gmail.com",
  "password": "Vinay1234",
  "roleId": 1
}

10  .     for user login    POST--     http://localhost:3000/api/auth/login

{

  "email": "Vinay@gmail.com",
  "password": "Vinay1234"

}

   11.   for logout      POST  --   http://localhost:3000/api/auth/logout

   12..    for see user profile at the time of login jwt token will we generated put this    token  in headers section authorization    GET        http://localhost:3000/api/users/profile


   13..    if admin see all register user and admin  --  GET  http://localhost:3000/api/users


   14... if admin update data   PUT    http://localhost:3000/api/users/11

   {

  "email": "Vinay1234@gmail.com",
  "password": "Vinay1234"

}

15..    if admin changes in profile  PUT         http://localhost:3000/api/users/profile

16..    if admin delete users       DELETE by ID     http://localhost:3000/api/users/11

17..    id admin create or assign task   POST    http://localhost:3000/api/tasks
{
  "title": "Implement JWT ",
  "description": "Task description here",
  "dueDate": "2024-09-30",
  "priority": "high"
}

18 ...  if admi  want to see all assign task   GET   http://localhost:3000/api/tasks

19 ... if admin want to change task or update anything   PUT   http://localhost:3000/api/tasks


20..   IF admin  want delete task      DELETE   http://localhost:3000/api/tasks/4


21..  if admin check analytics  settings
           GET     http://localhost:3000/api/analytics/task-completion-rate


