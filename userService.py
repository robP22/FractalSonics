import csv
import bcrypt
from datetime import datetime
import os

class UserService:
    def __init__(self):
        self.users_file = 'userAccounts.csv'
        self.purchase_file = 'userPurchaseHistory.csv'
        self.ensure_files_exist()
        
    def ensure_files_exist(self):
        if not os.path.exists(self.users_file):
            with open(self.users_file, 'w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(['user_id', 'email', 'password_hash', 'first_name', 'last_name', 'created_date', 'last_login', 'is_active'])
                
        if not os.path.exists(self.purchase_file):
            with open(self.purchase_file, 'w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(['purchase_id', 'user_id', 'product_id', 'product_title', 'price', 'quantity', 'purchase_date', 'order_status'])
                
    def hash_password(self, password):
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    def verify_password(self, password, hashed_password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
    
    def get_all_users(self):
        users = []
        try:
            with open(self.users_file, 'r', newline='') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    users.append(row)
        except FileNotFoundError:
            return []
        return users
    
    def get_user_by_email(self, email):
        users = self.get_all_users()
        for user in users:
            if user['email'].lower() == email.lower():
                return user
        return None
    
    def register_user(self, email, password, first_name, last_name):
        if self.get_user_by_email(email):
            return {'success': False, 'message': 'Email already registered'}
        
        if not email or not password or not first_name or not last_name:
            return {'success': False, 'message': 'All fields are required'}
        
        if len(password) < 6:
            return {'success': False, 'message': 'Password must be at least 6 characters'}
        
        users = self.get_all_users()
        new_user_id = len(users) + 1
        
        password_hash = self.hash_password(password)
        
        new_user = {
            'user_id': new_user_id,
            'email': email.lower(),
            'password_hash': password_hash,
            'first_name': first_name,
            'last_name': last_name,
            'created_date': datetime.now().strftime('%Y-%m-%d'),
            'last_login': '',
            'is_active': 'true'
        }
        
        with open(self.users_file, 'a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=list(new_user.keys()))
            writer.writerow(new_user)
            
        return {'success': True, 'message': 'User registered successfully', 'user_id': new_user_id}
    
    def login_user(self, email, password):
        user = self.get_user_by_email(email)
        
        if not user:
            return {'success': False, 'message': 'Invalid email or password'}
        
        if user['is_active'] != 'true':
            return {'success': False, 'message': 'Account is disabled'}
        
        if not self.verify_password(password, user['password_hash']):
            return {'success': False, 'message': 'Invalid email or password'}
        
        self.update_last_login(user['user_id'])
        
        user_info = {
            'user_id': user['user_id'],
            'email': user['email'],
            'first_name': user['first_name'],
            'last_name': user['last_name']
        }
        
        return {'success': True, 'message': 'Login successful', 'user': user_info}
    
    def update_last_login(self, user_id):
        users = self.get_all_users()
        
        for user in users:
            if user['user_id'] == str(user_id):
                user['last_login'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                break
            
        with open(self.users_file, 'w', newline='') as file:
            fieldnames = ['user_id', 'email', 'password_hash', 'first_name', 'last_name', 'created_date', 'last_login', 'is_active']
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(users)
    
    def get_user_by_id(self, user_id):
        users = self.get_all_users()
        for user in users:
            if user['user_id'] == str(user_id):
                return user
        return None