import datetime
import os
import logging
import json
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.utils import secure_filename
import pdfplumber
from groq import Groq
from sentence_transformers import SentenceTransformer
from werkzeug.security import generate_password_hash, check_password_hash
import faiss
from pymongo import MongoClient
from bson.json_util import dumps


logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r"/*": {"origins": "*"}})
client = Groq(api_key="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")

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017"
client_mongo = MongoClient(MONGO_URI)
db = client_mongo['authentication_db']
users_collection = db['users']

UPLOAD_FOLDER = 'C:/Users/Dell/Desktop/Sem-8/Hackathon-2024/temp'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf'}
PDF_CONTENT = 'C:/Users/Dell/Desktop/Sem-8/Hackathon-2024/temp/pdf_content.json'

model = SentenceTransformer('all-MiniLM-L6-v2')
index = faiss.IndexFlatL2(384) 
metadata = []

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def authenticate(username, password):
    user = users_collection.find_one({"username": username})
    if user and check_password_hash(user.get("password"), password):
        return True
    return False

class UserSignup(Resource):
    def post(self):
        data = request.get_json()

        if 'username' not in data or 'password' not in data:
            return {"error": "Missing 'username' or 'password' in the request"}, 400

        username = data['username']
        password = data['password']

        if users_collection.find_one({"username": username}):
            return {"error": "Username already exists"}, 400

        hashed_password = generate_password_hash(password)
        users_collection.insert_one({
            "username": username,
            "password": hashed_password
        })

        return {"message": "Signup successful"}, 201

class UserLogin(Resource):
    def post(self):
        data = request.get_json()

        if 'username' not in data or 'password' not in data:
            return {"error": "Missing 'username' or 'password' in the request"}, 400

        username = data['username']
        password = data['password']

        if authenticate(username, password):
            return {"name": username}, 200
        else:
            return {"error": "Invalid credentials"}, 401

class UserProfile(Resource):
    def get(self):
        auth = request.headers.get('Authorization')
        if not auth:
            return {"error": "Authorization header is missing"}, 401

        try:
            username, password = auth.split(":")
        except ValueError:
            return {"error": "Invalid Authorization header format"}, 400

        if authenticate(username, password):
            user = users_collection.find_one({"username": username})
            if user:
                return {
                    "username": user["username"],
                    "email": user.get("email", "N/A")
                }, 200
            else:
                return {"error": "User not found"}, 404
        else:
            return {"error": "Invalid credentials"}, 401



class PDF(Resource):
    def post(self):
        if 'pdfFiles' not in request.files:
            return {"error": "No files part"}, 400

        files = request.files.getlist('pdfFiles')
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                try:
                    with pdfplumber.open(file) as pdf:
                        chunks = []
                        for page_number, page in enumerate(pdf.pages):
                            text = page.extract_text() or ""
                            if text.strip():
                                chunk = {
                                    "content": text,
                                    "page": page_number + 1,
                                    "filename": filename
                                }
                                embedding = model.encode(text).astype("float32")
                                index.add(embedding.reshape(1, -1))
                                metadata.append(chunk)
                except Exception as e:
                    logging.error(f"Error processing file {filename}: {e}", exc_info=True)
                    return {"error": f"Failed to process file: {e}"}, 500
            else:
                return {"error": "Invalid file type. Only PDF files are allowed."}, 400

        return {"message": "Files uploaded and indexed successfully"}, 200


class Chat(Resource):
    def post(self):
        data = request.get_json()
        if 'message' not in data or 'role' not in data:
            return {"error": "Missing 'message' or 'role' in the request"}, 400

        query = data['message']
        query_embedding = model.encode(query).astype("float32")

        k = 5
        distances, indices = index.search(query_embedding.reshape(1, -1), k)
        retrieved_chunks = [metadata[i] for i in indices[0] if i < len(metadata)]

        context = "\n\n".join([f"Page {chunk['page']} ({chunk['filename']}): {chunk['content']}" for chunk in retrieved_chunks])

        print("CONTEXT_OF_THE_BEST_CHUNK_IN_THE_WORLD  : ",context)
        
        completion = client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[
                {"role": "user", "content": query},
                {"role": "system", "content": f"The most relevant PDF content:\n\n{context}"},
                {"role": "system", "content": "Answer the question based strictly on the provided content."}
            ],
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=False
        )
        response = completion.choices[0].message.content
        
        return {"message": response, "context": context}, 200

api.add_resource(UserLogin, '/auth/signin')
api.add_resource(UserSignup, '/auth/signup')
api.add_resource(PDF, '/pdf')
api.add_resource(Chat, '/chat')

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*' 
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response


if __name__ == '__main__':
    app.run(debug=True)
