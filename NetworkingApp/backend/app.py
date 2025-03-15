from flask import Flask, request, jsonify
import jwt  # PyJWT
import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
CORS(app)

# Dummy database
users = {}

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    if email in users:
        return jsonify({'error': 'User already exists'}), 400
    users[email] = {
        'name': data.get('name'),
        'password': data.get('password'),  # In production, store a hashed version!
        'industry': data.get('industry'),
    }
    return jsonify({'message': 'User created successfully'}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = users.get(email)
    if not user or user.get('password') != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    # Create a JWT token valid for 1 day
    token = jwt.encode({
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, app.config['SECRET_KEY'], algorithm='HS256')
    return jsonify({'token': token}), 200

if __name__ == '__main__':
    app.run(debug=True)
