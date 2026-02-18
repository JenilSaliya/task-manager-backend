# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Step by Step process for run project

first in your system have MongoDB, node.js, and VScode then open taskDo folder in your system

### step 1
 create .env file in taskDo folder and Backend folder 

>set variable in .env file of Backend folder 
```
    //Backend folder .env file
    Mongo_URI = "mongodb://localhost:27017/"

    React_URI = "http://localhost:5173" 

    Host_URI = "http://localhost:3000/"

    port = 3000
```

>set variable in .env file of TaskDo folder 
```
    //taskDo folder .env file 
    VITE_Backend_URI: "http://localhost:3000"
 ``` 


### step 2
open taskDo folder in your vscode then open terminal and run below command

>for install node modules

```
//run this command
npm install 

//make sure run below command in new terminal
npm run npmi

```


 ### step 3 

>for run front-end and back-end open terminal of taskDo folder open different terminal for different command
```
//run front-end
npm run dev

// run this command in new terminal for run backend
npm run backend
```

now you get url of front-end by ctrl+click you can run project ( ***Notice*** : on first time login need to create admin if you click on login button you redirect to admin creation page for more detail read below content )


## Admin Creation and Task Assignment

## Overview
 the user is required to create an **Admin** for the first time. After creating the admin account, they will be able to log in to the **Admin Dashboard**, assign tasks, and create new users for the platform.

### Flow of the Component

#### 1. **First-Time User Login**
   - When a user logs in for the first time, they are prompted to create an **Admin Account**.
   - The system will display a form with the following fields:
     - **Email**
     - **Password**
   - The user must fill in these details and submit the form.
   - Once the form is submitted, the system will create the Admin account and provide a success message.

#### 2. **Login to Admin Dashboard**
   - After the Admin account is created successfully, the user can log in to the **Admin Dashboard**.
   - Upon successful login, the Admin will be directed to the Admin Dashboard, where they can perform administrative tasks like:
     - **Assigning tasks**
     - **Creating new users**
   
#### 3. **Creating New Users**
   - The Admin can also create new users through the Admin Dashboard.
   - The Admin can:
     - Enter the new user's **Full Name**
     - Set the new user's **Email** and **Password**

#### 4. **Assigning Tasks**
   - In the Admin Dashboard, the Admin can create and assign tasks to other users.
   - The Admin will be able to:
     - Select a user
     - Provide a task description
     - Set a due date
     - Prioritize the task (optional)
     - Submit the task assignment
   

### Key Features:
- **Admin Account Creation**: Only one Admin account is created during the first-time login.
- **Admin Dashboard**: A dedicated space for Admins to manage users and tasks.
- **Task Assignment**: Admins can create and assign tasks to users.
- **User Creation**: Admins can create new users and assign roles.
---
