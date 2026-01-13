#!/bin/bash

echo "🚀 Starting JobHawk Development Environment..."

# Kill any existing processes
pkill -f "node" 2>/dev/null || true
pkill -f "npm" 2>/dev/null || true

# Start MongoDB (if installed)
if command -v mongod &> /dev/null; then
    echo "Starting MongoDB..."
    mongod --dbpath ~/data/db --fork --logpath /tmp/mongod.log 2>/dev/null || true
fi

# Start backend
echo "Starting Backend Server..."
cd ~/JobHawk/backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Seed demo jobs
echo "Seeding demo jobs..."
curl -X POST http://localhost:3001/api/jobs/seed/demo 2>/dev/null || true

# Start frontend
echo "Starting Frontend Server..."
cd ~/JobHawk/frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Servers are starting up!"
echo "🌐 Backend: http://localhost:3001"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo " Servers stopped."; exit' INT
wait
