# PDFSeek

This is a full-stack web application that enables users to upload PDF documents and ask questions, with answers generated using *Groq's LLaMA-3.1 model* based on the document context. The backend also provides secure user authentication, semantic search via FAISS, and PDF indexing using sentence-transformers. The frontend is built in Angular for a smooth user experience.

---

## Features

-  *User Authentication* with secure password hashing (signup/login)
-  *PDF Upload & Processing* using pdfplumber
-  *AI Question Answering* using Groq's LLaMA-3.1
-  *Semantic Search* using FAISS and SentenceTransformers
-  *Contextual Answers* pulled from most relevant PDF chunks
-  *MongoDB Integration* for user storage

---

##  Tech Stack

| Layer     | Technology                       |
|-----------|----------------------------------|
| Frontend  | Angular                          |
| Backend   | Flask + Flask-RESTful + CORS     |
| Database  | MongoDB                          |
| AI Models | Groq LLaMA-3.1 + SentenceTransformers |
| Search    | FAISS                            |
| PDF       | pdfplumber                       |

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
