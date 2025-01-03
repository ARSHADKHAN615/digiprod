# DigiProd E-commerce Platform Setup Guide

This guide will help you set up the DigiProd e-commerce platform on your computer. The platform consists of two parts: a frontend (what users see in their browser) and a backend (server that handles data and business logic).

## Prerequisites

Before starting, you need to install the following software on your computer:

1. **Node.js** (Version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the "LTS" (Long Term Support) version
   - Follow the installation wizard, accepting all defaults
   - To verify installation, open Command Prompt and type:
     ```
     node --version
     npm --version
     ```
   Both commands should show version numbers

2. **MySQL** (Version 8.0 or higher)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - During installation:
     - Choose a root password and save it somewhere safe
     - Accept all other default settings
   - Make sure to check "Start MySQL Server at System Startup"

3. **Visual Studio Code** (or any text editor)
   - Download from: https://code.visualstudio.com/
   - Follow the installation wizard
   - After installation, right-click on the project folder and select "Open with Code"

## Project Setup

1. **Download and Extract the Project**
   - Create a folder where you want to store the project (e.g., on your Desktop)
   - Extract the downloaded project files into this folder
   - You should see two main folders: `frontend` and `backend`

2. **Open Project in Visual Studio Code**
   ```
   Right-click on the project folder → Open with Visual Studio Code
   ```

## Setting Up the Database

1. Open MySQL Workbench (installed with MySQL)
2. Log in with your root password
3. In the Query Editor, paste and run this command:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

## Setting Up the Backend

1. **Navigate to Backend Directory**
   - Open Command Prompt as Administrator
   - Navigate to your project folder (replace with your actual path):
     ```
     cd C:\Users\YourUsername\Desktop\project-folder\backend
     ```
   - Or if you're in the project root:
     ```
     cd backend
     ```

2. **Create Environment File**
   - In VS Code, right-click on the `backend` folder
   - Select "New File"
   - Name it `.env`
   - Paste this content:
     ```
     DB_NAME=ecommerce_db
     DB_USER=root
     DB_PASSWORD=your_mysql_password_here
     DB_HOST=localhost
     PORT=3001
     ```
   - Replace `your_mysql_password_here` with your MySQL root password

3. **Install Dependencies and Start Backend**
   - In the Command Prompt (make sure you're in the backend folder):
     ```
     npm install
     npm run seed
     npm run dev
     ```
   - Keep this window open

## Setting Up the Frontend

1. **Open New Terminal for Frontend**
   - Open a new Command Prompt window
   - Navigate to your project folder:
     ```
     cd C:\Users\YourUsername\Desktop\project-folder\frontend
     ```
   - Or from project root:
     ```
     cd frontend
     ```

2. **Install and Start Frontend**
   ```
   npm install
   npm run dev
   ```
   - Keep this window open

## Accessing the Application

1. Open your web browser (Chrome recommended)
2. Type in the address bar:
   ```
   http://localhost:3000
   ```

## Common Issues and Solutions

1. **"Port already in use" error**
   - Open Command Prompt as Administrator
   - To kill process on port 3000:
     ```
     netstat -ano | findstr :3000
     taskkill /PID <PID_NUMBER> /F
     ```
   - To kill process on port 3001:
     ```
     netstat -ano | findstr :3001
     taskkill /PID <PID_NUMBER> /F
     ```

2. **Database connection error**
   - Open Services (Press Windows + R, type `services.msc`)
   - Find "MySQL80" and ensure it's running
   - Check `.env` file credentials match your MySQL setup
   - Try restarting MySQL service:
     ```
     net stop MySQL80
     net start MySQL80
     ```

3. **"npm not found" error**
   - Open new Command Prompt
   - Run:
     ```
     refreshenv
     ```
   - Or restart your computer

## Starting the Application Daily

1. **Start Backend**
   ```
   cd path\to\project\backend
   npm run dev
   ```

2. **Start Frontend** (in new Command Prompt)
   ```
   cd path\to\project\frontend
   npm run dev
   ```

## Stopping the Application

1. In both Command Prompt windows:
   - Press `Ctrl + C`
   - Type `Y` and press Enter when asked to terminate

## Need Help?

If you encounter any issues:
1. Make sure you followed all steps exactly
2. Check if all required software is installed
3. Try restarting your computer
4. Contact the development team for support

## Additional Notes

- The backend must be running for the frontend to work properly
- Keep both Command Prompt windows open while using the application
- Always start the backend first, then the frontend
- If you close the Command Prompt windows, you'll need to restart both servers 