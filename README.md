# Hackathon Project

This repository contains the **frontend** and **backend** code for the hackathon project. The frontend is built with **Angular**, and the backend is developed using **Flask** with **MongoDB** for database management and **Groq** for API handling.

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v14+)
- **Angular CLI** (v12+)
- **Python** (v3.8+)
- **pip** (Python package manager)
- **MongoDB Compass** (or MongoDB installed locally)
- **Groq** (for API integrations)

---

# Groq API Key Configuration

To use the Groq API in this project, you need to obtain an API key. Follow the steps below:

---

## Obtaining the API Key

1. Visit the Groq API key management page:  
   [Obtain API Key](https://console.groq.com)

2. Log in with your credentials or create a new account if you don’t have one.

3. Generate a new API key under your account settings.

4. Copy the API key to use in the project.

---

## Configuring the API Key in the Project

1. Add the API key to the appropriate configuration variable:
   ```python
   GROQ_API_KEY = "your_api_key_here"


## Frontend Setup
### How to Run :
  1. Clone the repo.
     ```bash
     cd Hackathon-2024
     ```
  2. Install the latest version of Angular
     ```bash
     npm install -g @angular/cli
     ```
  3. Install the necessary packages using
     ```bash
     npm install
     ```
  4. Run the server
     ```bash
     ng serve
     ```
     The application will be accessible at [http://localhost:4200/](http://localhost:4200/)

# Backend Setup for Hackathon Project

This document provides instructions to set up the backend for the hackathon project, developed using **Flask** with **MongoDB** and **Groq** for API handling.

---

## Prerequisites

Ensure the following are installed on your system:

- **Python** (v3.8+)
- **pip** (Python package manager)
- **MongoDB Compass** (or MongoDB installed locally)
- **Groq** (for API integrations)

---

## Setup Instructions

1. **Navigate to the backend directory**:
   ```bash
   cd hackathon/backend
   ```
2. Create a virtual environment (optional but recommended):
     ```bash
     virtualenv venv
     venv\Scripts\activate
     ```
3. Install the necessary packages using
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server
   ```bash
   flask run
   ```
# MongoDB Configuration

Follow these steps to configure MongoDB for the hackathon project:

1. **Open MongoDB Compass or your MongoDB client**:
   - Launch MongoDB Compas

2. **Connect to your MongoDB instance**:
   - Use the following connection string:
     ```
     mongodb://localhost:27017
     ```
   - Ensure your MongoDB service is running locally.

3. **Create a new database**:
   - Name the database:
     ```
     authentication_db
     ```

4. **Set up the required collections and data**:
   - Based on the application's requirements, create necessary collections ( `users`).

---

For any issues with MongoDB configuration:
- Ensure MongoDB service is running (`mongod`).
- Verify the connection URI matches your MongoDB setup.

