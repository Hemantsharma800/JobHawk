#!/bin/bash
echo "=== Checking Syntax Errors ==="
echo ""
echo "1. AuthContext.js (Line 5):"
sed -n '1,10p' src/contexts/AuthContext.js
echo ""
echo "2. Navigation.js (Line 27):"
sed -n '25,30p' src/components/Navigation.js
echo ""
echo "3. Dashboard.js (Line 7):"
sed -n '5,10p' src/pages/Dashboard.js
echo ""
echo "4. Jobs.js (Line 8):"
sed -n '5,10p' src/pages/Jobs.js
echo ""
echo "5. jobManager.js (Line 4):"
sed -n '1,10p' src/utils/jobManager.js
