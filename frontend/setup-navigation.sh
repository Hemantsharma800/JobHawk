#!/bin/bash

echo "Setting up enhanced navigation system..."

# Create necessary directories
mkdir -p ~/JobHawk/frontend/src/utils
mkdir -p ~/JobHawk/frontend/src/components

# Navigate to project
cd ~/JobHawk/frontend

# Install dependencies if needed
if ! npm list react-router-dom 2>/dev/null | grep -q "react-router-dom"; then
  echo "Installing react-router-dom..."
  npm install react-router-dom
fi

echo "Setup complete!"
echo "Starting development server..."
npm start
