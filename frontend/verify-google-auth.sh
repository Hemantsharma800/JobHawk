#!/bin/bash

echo "🔍 VERIFYING GOOGLE AUTHENTICATION SETUP"
echo "========================================"

# Check if backend is running
echo "1. Checking backend server..."
if curl -s http://localhost:5000 > /dev/null; then
    echo "✅ Backend is running on http://localhost:5000"
else
    echo "❌ Backend is NOT running. Please start it with:"
    echo "   cd /Users/macbookpro/JobHawk/backend && npm run dev"
    exit 1
fi

# Check Google auth endpoint
echo "2. Checking Google auth endpoint..."
if curl -s http://localhost:5000/api/google-auth/health | grep -q "success"; then
    echo "✅ Google auth service is operational"
else
    echo "❌ Google auth endpoint not responding"
    exit 1
fi

# Check if frontend is running
echo "3. Checking frontend server..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend is NOT running. Please start it with:"
    echo "   cd /Users/macbookpro/JobHawk/frontend && npm start"
    exit 1
fi

# Check localStorage availability
echo "4. Checking browser environment..."
echo "   📱 Open http://localhost:3000/login in your browser"
echo "   🔵 Click the 'Continue with Google' button"
echo "   👤 Select a demo account from the popup"
echo "   ✅ You should be redirected to dashboard on success"

# Test the Google auth API directly
echo "5. Testing Google auth API..."
TEST_RESPONSE=$(curl -s -X POST http://localhost:5000/api/google-auth/simulated-google-auth \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","name":"Test User"}')

if echo "$TEST_RESPONSE" | grep -q "success"; then
    echo "✅ Google auth API is working correctly"
else
    echo "❌ Google auth API test failed"
    echo "Response: $TEST_RESPONSE"
    exit 1
fi

echo ""
echo "🎉 SETUP VERIFICATION COMPLETE!"
echo "==============================="
echo "Next steps:"
echo "1. Open http://localhost:3000"
echo "2. Click 'Sign in'"
echo "3. Click 'Continue with Google'"
echo "4. Select a demo account"
echo "5. You'll be redirected to dashboard"
echo ""
echo "💡 If you see any errors, check:"
echo "   - Both servers are running (ports 3000 & 5000)"
echo "   - No browser popup blockers are active"
echo "   - Console for detailed error messages (F12)"
