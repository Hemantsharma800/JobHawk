#!/bin/bash
echo "🚀 Starting JobHawk - Complete Edition"

# Kill existing processes
lsof -ti:3000,5000 | xargs kill -9 2>/dev/null || true

# Start backend
echo "📡 Starting backend server..."
cd backend
npm start > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers started successfully!"
echo ""
echo "🌐 Backend:  http://localhost:5000"
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "📋 Demo Credentials:"
echo "   Email: demo@jobhawk.com"
echo "   Password: demo123"
echo ""
echo "🔧 Features:"
echo "   • LinkedIn-style Job Search"
echo "   • Applications Tracker"
echo "   • Portfolio Profile"
echo "   • 10+ Job Portals Integration"
echo "   • Real-time Analytics"
echo ""
echo "🛑 Press Ctrl+C to stop servers"

cleanup() {
    echo "Shutting down..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT
wait
