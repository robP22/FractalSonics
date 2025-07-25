# Fractal Sonics Dependencies 📦

This document outlines all dependencies required for the Fractal Sonics e-commerce application.

## 🚀 Quick Installation

### One-Command Setup
```bash
git clone https://github.com/robP22/FractalSonics.git
cd FractalSonics
npm run install-all
```

## 📋 Frontend Dependencies (React)

### Core React Dependencies
Located in: `my-app/package.json`

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.6.3",
    "react-scripts": "5.0.1"
  }
}
```

### Payment Processing
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Testing & Development
```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0"
  }
}
```

## 🐍 Backend Dependencies (Python)

### Core Flask Dependencies
Located in: `requirements.txt`

```txt
Flask==3.0.0
Flask-CORS==4.0.0
python-dotenv==1.0.0
```

### Installation Commands
```bash
# Using pip
pip install -r requirements.txt

# Using pip with virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🛠️ Development Tools

### Optional Development Dependencies
```bash
# For running frontend and backend concurrently
npm install -g concurrently

# For Python virtual environment management
pip install virtualenv
```

## 🔧 System Requirements

### Node.js & npm
- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher

Check versions:
```bash
node --version
npm --version
```

### Python
- **Python**: Version 3.8.0 or higher
- **pip**: Latest version recommended

Check versions:
```bash
python --version
pip --version
```

## 📝 Installation Scripts

### Available npm Scripts
Located in root `package.json`:

```json
{
  "scripts": {
    "start": "cd my-app && npm start",
    "build": "cd my-app && npm run build", 
    "backend": "python app.py",
    "install-frontend": "cd my-app && npm install",
    "install-backend": "pip install -r requirements.txt",
    "install-all": "npm run install-frontend && npm run install-backend",
    "dev": "concurrently \"npm run backend\" \"npm run start\"",
    "test": "cd my-app && npm test"
  }
}
```

### Usage Examples
```bash
# Install all dependencies
npm run install-all

# Start frontend only
npm start

# Start backend only
npm run backend

# Start both frontend and backend
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 🌍 Environment Variables

### Required Environment Variables
Create `.env` file in `my-app/` directory:

```env
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# API Configuration
REACT_APP_API_URL=http://localhost:5000

# Development Settings
REACT_APP_ENVIRONMENT=development
```

## 📊 Dependency Overview

### Frontend Bundle Size
- React application: ~2.5MB (development)
- Production build: ~500KB (optimized)

### Backend Dependencies
- Flask: Lightweight web framework
- Flask-CORS: Cross-origin resource sharing
- python-dotenv: Environment variable management

## 🔍 Troubleshooting

### Common Installation Issues

#### Node.js Version Conflicts
```bash
# Check installed version
node --version

# Install latest LTS version using nvm
nvm install --lts
nvm use --lts
```

#### Python Virtual Environment
```bash
# Create virtual environment
python -m venv fractal-sonics-env

# Activate (macOS/Linux)
source fractal-sonics-env/bin/activate

# Activate (Windows)
fractal-sonics-env\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### npm Permission Issues
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm

# Alternative: Use npx for package execution
npx create-react-app my-app
```

### Version Compatibility

| Component | Minimum Version | Tested Version | Status |
|-----------|----------------|----------------|--------|
| Node.js   | 14.0.0         | 18.17.0        | ✅ |
| npm       | 6.0.0          | 9.6.7          | ✅ |
| Python    | 3.8.0          | 3.11.0         | ✅ |
| Flask     | 3.0.0          | 3.0.0          | ✅ |
| React     | 18.0.0         | 18.2.0         | ✅ |

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Stripe React Documentation](https://stripe.com/docs/stripe-js/react)
- [npm Documentation](https://docs.npmjs.com/)
- [Python pip Guide](https://pip.pypa.io/en/stable/user_guide/)
