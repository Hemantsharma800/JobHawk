#!/bin/bash

echo "=== JobHawk Full-Stack Setup ==="

# Install backend dependencies
echo "1. Setting up backend..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "2. Setting up frontend..."
cd frontend
npm install
cd ..

# Create environment files
echo "3. Creating environment files..."

# Backend .env
cat > backend/.env << 'ENVEOF'
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobhawk
JWT_SECRET=jobhawk_secret_key_$(openssl rand -hex 32)
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@jobhawk.com
FRONTEND_URL=http://localhost:3000
ENVEOF

# Frontend .env
cat > frontend/.env << 'ENVEOF'
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=JobHawk
REACT_APP_VERSION=1.0.0
ENVEOF

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB: brew services start mongodb-community"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm start"
echo ""
echo "📝 Default Admin: admin@jobhawk.com / admin123"
