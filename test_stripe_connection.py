#!/usr/bin/env python3
"""
Quick test script to verify Stripe connection
Run this to test your Stripe configuration before starting the app
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_stripe_connection():
    try:
        import stripe
        
        # Get API key from environment
        api_key = os.getenv('STRIPE_SECRET_KEY')
        
        if not api_key:
            print("❌ STRIPE_SECRET_KEY not found in .env file")
            return False
            
        if not api_key.startswith('sk_test_'):
            print("❌ Invalid Stripe secret key format")
            return False
            
        # Configure Stripe
        stripe.api_key = api_key
        
        # Test API connection
        print("🔄 Testing Stripe connection...")
        
        # Try to retrieve account info (minimal API call)
        account = stripe.Account.retrieve()
        
        print(f"✅ Stripe connection successful!")
        print(f"   Account ID: {account.id}")
        print(f"   Country: {account.country}")
        print(f"   Currency: {account.default_currency}")
        print(f"   Test Mode: {'Yes' if not account.livemode else 'No'}")
        
        return True
        
    except ImportError:
        print("❌ Stripe library not installed. Run: pip install stripe")
        return False
    except stripe.error.AuthenticationError:
        print("❌ Invalid Stripe API key")
        return False
    except Exception as e:
        print(f"❌ Error connecting to Stripe: {str(e)}")
        return False

if __name__ == "__main__":
    print("🎵 Fractal Sonics - Stripe Connection Test")
    print("=" * 50)
    
    success = test_stripe_connection()
    
    if success:
        print("\n🚀 Ready to start your Flask server!")
        print("   Run: python app.py")
    else:
        print("\n🔧 Please fix the issues above before starting the server")