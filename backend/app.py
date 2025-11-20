from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Manasa@123",
    database="task1"
)

cursor = db.cursor(dictionary=True)  

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    required_fields = ['name', 'email', 'password', 'role']
    for field in required_fields:
        if field not in data or not data[field].strip():
            return jsonify({"error": f"{field} is required"}), 400
    cursor.execute("""
        INSERT INTO users(name, email, password, role)
        VALUES (%s, %s, %s, %s)
    """, (data['name'], data['email'], data['password'], data['role']))
    db.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    
    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in data or not data[field].strip():
            return jsonify({"error": f"{field} is required"}), 400
    cursor.execute(
        "SELECT * FROM users WHERE email=%s AND password=%s",
        (data['email'], data['password'])
    )
    user = cursor.fetchone()

    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "Invalid credentials"}), 401
@app.route('/clients', methods=['POST'])
def add_client():
    data = request.json
    cursor.execute("""
        INSERT INTO clients(name, job_role)
        VALUES (%s, %s)
    """, (data['name'], data['job_role']))
    db.commit()
    return jsonify({"message": "Client added"})

@app.route('/clients/<int:id>', methods=['GET'])
def get_single_client(id):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clients WHERE id=%s", (id,))
    client = cursor.fetchone()

    if client:
        return jsonify(client)
    else:
        return jsonify({"error": "Client not found"}), 404

@app.route('/clients/<int:id>', methods=['PUT'])
def update_client(id):
    data = request.json
    cursor.execute("""
        UPDATE clients SET name=%s, job_role=%s WHERE id=%s
    """, (data['name'], data['job_role'], id))
    db.commit()
    return jsonify({"message": "Client updated"})


@app.route('/clients/<int:id>', methods=['DELETE'])
def delete_client(id):
    cursor.execute("DELETE FROM clients WHERE id=%s", (id,))
    db.commit()
    return jsonify({"message": "Client deleted"})

@app.route('/clients', methods=['GET'])
def get_clients():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clients")
    clients = cursor.fetchall()
    return jsonify(clients)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
