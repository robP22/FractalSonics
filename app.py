from flask import Flask, jsonify, request, session
from flask_cors import CORS
import csv
import os
import stripe
from dotenv import load_dotenv
from userService import UserService
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

app = Flask(__name__)
CORS(app, 
     origins=["http://localhost:3000"], 
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization", "Cookie"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
app.secret_key = 'your-secret-key-here'  # Change this to a secure secret key

# Initialize UserService
user_service = UserService()

def save_purchase_to_history(user_id, cart_items, customer_info, payment_intent_id):
    """Save purchase information to userPurchaseHistory.csv"""
    try:
        # Read existing purchases to get the next purchase_id
        next_id = 1
        try:
            with open('userPurchaseHistory.csv', 'r', newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                purchase_ids = [int(row['purchase_id']) for row in reader if row['purchase_id'].isdigit()]
                next_id = max(purchase_ids) + 1 if purchase_ids else 1
        except FileNotFoundError:
            # Create file with headers if it doesn't exist
            with open('userPurchaseHistory.csv', 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow(['purchase_id', 'user_id', 'product_id', 'product_title', 'price', 'quantity', 'purchase_date', 'order_status'])
        
        # Append new purchases
        with open('userPurchaseHistory.csv', 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            current_date = datetime.now().strftime('%Y-%m-%d')
            
            for item in cart_items:
                writer.writerow([
                    next_id,
                    user_id,
                    item.get('id', ''),
                    item.get('title', ''),
                    item.get('price', 0),
                    item.get('quantity', 1),
                    current_date,
                    'completed'
                ])
                next_id += 1
                
        print(f"✅ Saved {len(cart_items)} purchases to history for user {user_id}")
        
        # Update trending products after new purchases
        update_trending_products()
        
    except Exception as e:
        print(f"❌ Error saving purchase to history: {e}")

def update_trending_products():
    """Calculate top 5 most purchased products and update Products.csv with trending status"""
    try:
        # Calculate purchase counts for each product
        product_purchases = {}
        
        with open('userPurchaseHistory.csv', 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                product_id = row.get('product_id', '')
                quantity = int(row.get('quantity', 1))
                
                if product_id in product_purchases:
                    product_purchases[product_id] += quantity
                else:
                    product_purchases[product_id] = quantity
        
        # Get top 5 most purchased products
        top_products = sorted(product_purchases.items(), key=lambda x: x[1], reverse=True)[:5]
        trending_product_ids = [product_id for product_id, _ in top_products]
        
        print(f"📈 Trending products: {trending_product_ids}")
        
        # Read current products
        products = []
        with open('Products.csv', 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            products = list(reader)
        
        # Update trending status
        for product in products:
            product_id = product.get('id', '')
            current_tags = product.get('tags', '')
            
            # Remove existing Trending tag
            tags_list = [tag.strip() for tag in current_tags.split(',') if tag.strip() and tag.strip() != 'Trending']
            
            # Add Trending tag if product is in top 5
            if product_id in trending_product_ids:
                tags_list.append('Trending')
            
            # Update tags field
            product['tags'] = ', '.join(tags_list) if tags_list else ''
        
        # Write updated products back to CSV
        if products:
            fieldnames = products[0].keys()
            with open('Products.csv', 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(products)
            
            print(f"✅ Updated trending status for products")
            
    except Exception as e:
        print(f"❌ Error updating trending products: {e}")

@app.route('/api/products', methods=['GET'])
def get_products():
    products = []
    with open('Products.csv', newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            products.append(row)
    return jsonify(products)

@app.route('/api/update-trending', methods=['POST'])
def update_trending_endpoint():
    """Manually trigger trending products update"""
    try:
        update_trending_products()
        return jsonify({"success": True, "message": "Trending products updated successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": f"Error updating trending products: {str(e)}"}), 500

@app.route('/api/trending-stats', methods=['GET'])
def get_trending_stats():
    """Get current trending product statistics"""
    try:
        product_purchases = {}
        
        with open('userPurchaseHistory.csv', 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                product_id = row.get('product_id', '')
                product_title = row.get('product_title', '')
                quantity = int(row.get('quantity', 1))
                
                if product_id in product_purchases:
                    product_purchases[product_id]['total_sold'] += quantity
                else:
                    product_purchases[product_id] = {
                        'product_id': product_id,
                        'product_title': product_title,
                        'total_sold': quantity
                    }
        
        # Get top 5 and sort by sales
        trending_products = sorted(product_purchases.values(), key=lambda x: x['total_sold'], reverse=True)[:5]
        
        return jsonify({
            "success": True,
            "trending_products": trending_products,
            "total_products_analyzed": len(product_purchases)
        })
        
    except Exception as e:
        return jsonify({"success": False, "message": f"Error getting trending stats: {str(e)}"}), 500

@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.json
    cart = data.get('cart', [])
    customer = data.get('customer', {})
    if not cart or not customer:
        return jsonify({"success": False, "message": "Missing data"}), 400
    print(f"Order from {customer.get('name', 'Unknown')}: {cart}")
    return jsonify({"success": True, "message": "Order placed!"})

@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        cart_items = data.get('cart_items', [])
        
        if not cart_items:
            return jsonify({"error": "Cart is empty"}), 400
        
        # Calculate total amount
        total_amount = 0
        for item in cart_items:
            price = float(item.get('price', 0))
            quantity = int(item.get('quantity', 1))
            total_amount += price * quantity
        
        # For demo purposes, we'll simulate a Stripe checkout session
        # In a real application, you would create an actual Stripe checkout session
        fake_session_url = f"http://localhost:3000/checkout?amount={total_amount}&session=demo_session_123"
        
        # Log the checkout session for debugging
        print(f"Checkout Session Created:")
        print(f"  Total Amount: ${total_amount:.2f}")
        print(f"  Items: {len(cart_items)} items")
        for item in cart_items:
            print(f"    - {item.get('name', 'Unknown')} x{item.get('quantity', 1)} @ ${item.get('price', 0)}")
        
        return jsonify({
            "url": fake_session_url,
            "session_id": "demo_session_123",
            "amount": total_amount
        })
        
    except Exception as e:
        print(f"Error creating checkout session: {e}")
        return jsonify({"error": "Failed to create checkout session"}), 500

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.json
        amount = data.get('amount')  # Amount in cents
        currency = data.get('currency', 'usd')
        customer_info = data.get('customer_info', {})
        cart_items = data.get('cart_items', [])
        
        if not amount or amount <= 0:
            return jsonify({"error": "Invalid amount"}), 400
        
        # Create real Stripe payment intent
        intent = stripe.PaymentIntent.create(
            amount=int(amount),
            currency=currency,
            metadata={
                'customer_name': customer_info.get('name', ''),
                'customer_email': customer_info.get('email', ''),
                'items_count': str(len(cart_items))
            }
        )
        
        # Log the order for debugging
        print(f"Stripe Payment Intent Created:")
        print(f"  Intent ID: {intent.id}")
        print(f"  Amount: ${amount/100:.2f} {currency.upper()}")
        print(f"  Customer: {customer_info.get('name', 'Unknown')} ({customer_info.get('email', 'No email')})")
        print(f"  Items: {len(cart_items)} items")
        
        return jsonify({
            "client_secret": intent.client_secret,
            "amount": amount,
            "currency": currency
        })
        
    except stripe.error.StripeError as e:
        print(f"Stripe error creating payment intent: {e}")
        return jsonify({"error": "Failed to create payment intent"}), 500
    except Exception as e:
        print(f"Error creating payment intent: {e}")
        return jsonify({"error": "Failed to create payment intent"}), 500

@app.route('/api/confirm-payment', methods=['POST'])
def confirm_payment():
    try:
        data = request.json
        payment_intent_id = data.get('payment_intent_id')
        customer_info = data.get('customer_info', {})
        cart_items = data.get('cart_items', [])
        amount = data.get('amount')
        
        if not payment_intent_id:
            return jsonify({"error": "Payment intent ID required"}), 400
        
        # Verify payment with Stripe (unless it's a demo payment)
        if payment_intent_id.startswith('pi_demo_'):
            # Handle demo payments for development
            print(f"Demo Payment Confirmed:")
            print(f"  Payment Intent: {payment_intent_id}")
            print(f"  Amount: ${amount/100:.2f}")
            print(f"  Customer: {customer_info.get('name', 'Unknown')} ({customer_info.get('email', 'No email')})")
        else:
            # Verify real Stripe payment
            try:
                intent = stripe.PaymentIntent.retrieve(payment_intent_id)
                
                if intent.status != 'succeeded':
                    return jsonify({"error": "Payment not successful"}), 400
                
                print(f"Stripe Payment Verified:")
                print(f"  Payment Intent: {payment_intent_id}")
                print(f"  Status: {intent.status}")
                print(f"  Amount: ${intent.amount/100:.2f} {intent.currency.upper()}")
                print(f"  Customer: {customer_info.get('name', 'Unknown')} ({customer_info.get('email', 'No email')})")
                
            except stripe.error.StripeError as e:
                print(f"Stripe error verifying payment: {e}")
                return jsonify({"error": "Failed to verify payment"}), 500
        
        # Save purchase to history
        user_id = session.get('user_id', '3')  # Use logged-in user or default to '3'
        save_purchase_to_history(user_id, cart_items, customer_info, payment_intent_id)
        
        return jsonify({
            "success": True,
            "message": "Payment successful!",
            "order_id": f"order_{payment_intent_id[-8:]}"
        })
        
    except Exception as e:
        print(f"Error confirming payment: {e}")
        return jsonify({"error": "Failed to confirm payment"}), 500

@app.route('/api/purchase-history', methods=['GET'])
def get_purchase_history():
    # Use logged-in user's ID if available, otherwise default to '3' for demo
    user_id = session.get('user_id', '3')
    user_id = request.args.get('user_id', user_id)
    
    purchases = []
    try:
        with open('userPurchaseHistory.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['user_id'] == str(user_id):
                    purchases.append(row)
    except FileNotFoundError:
        return jsonify([])
    return jsonify(purchases)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400
    
    result = user_service.login_user(email, password)
    
    if result['success']:
        session['user_id'] = result['user']['user_id']
        session['user'] = result['user']
        return jsonify(result)
    else:
        return jsonify(result), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    
    if not all([email, password, first_name, last_name]):
        return jsonify({"success": False, "message": "All fields are required"}), 400
    
    result = user_service.register_user(email, password, first_name, last_name)
    
    if result['success']:
        return jsonify(result), 201
    else:
        return jsonify(result), 400

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True, "message": "Logged out successfully"})

@app.route('/api/user/profile', methods=['GET'])
def get_user_profile():
    if 'user_id' in session:
        user = user_service.get_user_by_id(session['user_id'])
        if user:
            user_info = {
                'user_id': user['user_id'],
                'email': user['email'],
                'first_name': user['first_name'],
                'last_name': user['last_name']
            }
            return jsonify({"success": True, "user": user_info})
    
    return jsonify({"success": False, "message": "Not authenticated"}), 401

if __name__ == '__main__':
    # Update trending products on startup
    print("🚀 Starting FractalSonics server...")
    update_trending_products()
    app.run(debug=True)