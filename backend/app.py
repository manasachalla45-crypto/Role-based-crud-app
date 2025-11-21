from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
import json

app = Flask(__name__)
CORS(app, supports_credentials=True)


app.config["JWT_SECRET_KEY"] = "my-new-super-secret-key-for-jwt-testing-12345"
jwt = JWTManager(app)


def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Manasa@123",
        database="task1"
    )

# ------------------- REGISTER -------------------
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    required_fields = ['name', 'email', 'password', 'role']

    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return jsonify({"error": f"{field} is required"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email=%s", (data['email'],))
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            db.close()
            return jsonify({"error": "Email already registered"}), 400

        cursor.execute(
            "INSERT INTO users(name, email, password, role) VALUES (%s, %s, %s, %s)",
            (data['name'], data['email'], data['password'], data['role'])
        )
        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "User registered successfully"}), 201
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Database connection error"}), 500

# ------------------- LOGIN -------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    required_fields = ['email', 'password']

    for field in required_fields:
        if field not in data or not data[field].strip():
            return jsonify({"error": f"{field} is required"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(
            "SELECT id, email, role FROM users WHERE email=%s AND password=%s",
            (data['email'], data['password'])
        )
        user = cursor.fetchone()
        cursor.close()
        db.close()

        if user:
            access_token = create_access_token(
                identity=json.dumps({"user_id": user['id'], "role": user['role']}),
                additional_claims={"role": user['role']}
            )
            return jsonify(access_token=access_token, user_role=user['role'])

        return jsonify({"error": "Invalid credentials"}), 401
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Database connection error"}), 500

# ------------------- ADD CLIENT -------------------
@app.route('/clients', methods=['POST'])
@jwt_required()
def add_client():
    current_user_info = json.loads(get_jwt_identity())
    user_role = current_user_info.get('role')

    if user_role not in ['admin', 'manager']:
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.json

    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO clients(name, job_role) VALUES (%s, %s)",
            (data['name'], data['job_role'])
        )
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"message": "Client added"}), 201
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Failed to add client"}), 500

# ------------------- GET ALL CLIENTS -------------------
@app.route('/clients', methods=['GET'])
@jwt_required()
def get_clients():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clients")
        clients = cursor.fetchall()
        cursor.close()
        db.close()
        return jsonify(clients)
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Database connection error"}), 500

# ------------------- GET SINGLE CLIENT -------------------
@app.route('/clients/<int:id>', methods=['GET'])
@jwt_required()
def get_single_client(id):
    current_user_info = json.loads(get_jwt_identity())
    user_role = current_user_info.get('role')

    if user_role == 'user':
        return jsonify({"error": "Unauthorized access"}), 403

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clients WHERE id=%s", (id,))
        client = cursor.fetchone()
        cursor.close()
        db.close()

        if client:
            return jsonify(client)
        return jsonify({"error": "Client not found"}), 404
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Database connection error"}), 500

# ------------------- UPDATE CLIENT -------------------
@app.route('/clients/<int:id>', methods=['PUT'])
@jwt_required()
def update_client(id):
    current_user_info = json.loads(get_jwt_identity())
    user_role = current_user_info.get('role')

    if user_role not in ['admin', 'manager']:
        return jsonify({"error": "Unauthorized access"}), 403

    data = request.json

    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute(
            "UPDATE clients SET name=%s, job_role=%s WHERE id=%s",
            (data['name'], data['job_role'], id)
        )
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"message": "Client updated"})
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Failed to update client"}), 500

# ------------------- DELETE CLIENT -------------------
@app.route('/clients/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_client(id):
    current_user_info = json.loads(get_jwt_identity())
    user_role = current_user_info.get('role')

    if user_role != 'admin':
        return jsonify({"error": "Unauthorized access"}), 403

    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("DELETE FROM clients WHERE id=%s", (id,))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({"message": "Client deleted"})
    except mysql.connector.Error as err:
        print("Database error:", err)
        return jsonify({"error": "Failed to delete client"}), 500

# ------------------- RUN APP -------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
