from flask import Flask, jsonify, request, session
from flask_cors import CORS
from userService import UserService
import csv

app = Flask(__name__)
app.secret_key = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0'
CORS(app, supports_credentials=True)

# Initialize user service
user_service = UserService()


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    result = user_service.register_user(
        data.get('email'),
        data.get('password'),
        data.get('first_name'),
        data.get('last_name'),
    )
    return jsonify(result)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    result = user_service.login_user(
        data.get('email'),
        data.get('password')
    )
    
    if result['success']:
        session['user_id'] = result['user']['user_id']
        session['user_email'] = result['user']['email']
        
    return jsonify(result)


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True, 'message': 'Logged out successfully'})


@app.route('/api/user/profile', methods=['GET'])
def get_profile():
    if 'user_id' not in session:
        return jsonify({'success': False, 'message': 'Not authenticated'}), 401
    
    user = user_service.get_user_by_id(session['user_id'])
    if user:
        user_info = {
            'user_id': user['user_id'],
            'email': user['email'],
            'first_name': user['first_name'],
            'last_name': user['last_name']
        }
        return jsonify({'success': True, 'user': user_info})
    
    return jsonify({'success': False, 'message': 'User not found'}), 404


@app.route('/api/products', methods=['GET'])
def get_products():
    products = []
    with open('Products.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            products.append(row)
    return jsonify(products)


@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.json
    cart = data.get('cart', [])
    customer = data.get('customer', {})
    if not cart or not customer:
        return jsonify({"success": False, "message": "Missing data"}), 400
    # You can add validation and save order to DB here
    print(f"Order from {customer.get('name', 'Unknown')}: {cart}")
    return jsonify({"success": True, "message": "Order placed!"})


if __name__ == '__main__':
    app.run(debug=True)