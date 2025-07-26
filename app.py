from flask import Flask, jsonify, request, session
from flask_cors import CORS
from userService import UserService
import csv
import stripe
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_your_stripe_secret_key_here')

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


@app.route('/api/purchase-history', methods=['GET'])
def get_purchase_history():
    history = []
    with open('userPurchaseHistory.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            history.append(row)
    return jsonify(history)


@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.json
        amount = data.get('amount')  # Amount in cents
        currency = data.get('currency', 'usd')
        customer_info = data.get('customer_info', {})
        cart_items = data.get('cart_items', [])
        
        if not amount or amount < 50:  # Stripe minimum is $0.50
            return jsonify({'error': 'Invalid amount'}), 400
        
        # Create payment intent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            metadata={
                'customer_name': customer_info.get('name', ''),
                'customer_email': customer_info.get('email', ''),
                'items_count': len(cart_items)
            }
        )
        
        return jsonify({
            'client_secret': intent.client_secret,
            'payment_intent_id': intent.id
        })
        
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500


@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        line_items = []
        
        # Convert cart items to Stripe line items
        for item in data.get('cart_items', []):
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item.get('title', 'Unknown Product'),
                        'description': item.get('description', ''),
                        'images': [item.get('image_url')] if item.get('image_url') else [],
                    },
                    'unit_amount': int(float(item.get('price', 0)) * 100),  # Convert to cents
                },
                'quantity': item.get('quantity', 1),
            })
        
        if not line_items:
            return jsonify({'error': 'No items in cart'}), 400
        
        # Create checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url='http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:3000/cart',
            metadata={
                'user_id': session.get('user_id', ''),
                'user_email': session.get('user_email', '')
            }
        )
        
        return jsonify({'url': session.url, 'session_id': session.id})
        
    except stripe.error.StripeError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred'}), 500


if __name__ == '__main__':
    app.run(debug=True)