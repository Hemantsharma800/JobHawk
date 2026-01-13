#!/bin/bash

echo "Fixing TypeScript syntax in JavaScript files..."

# 1. Fix Navigation.js
if [ -f "src/components/Navigation.js" ]; then
    # Fix arrow function with type annotation
    sed -i '' 's/const handlePortalConnect = {portalId: string} =>/const handlePortalConnect = (portalId) =>/g' src/components/Navigation.js
    
    # Fix type assertion
    sed -i '' 's/portalId as keyof typeof connectedPortals/portalId/g' src/components/Navigation.js
    
    echo "Fixed Navigation.js"
fi

# 2. Fix AuthContext.js - remove interface
if [ -f "src/contexts/AuthContext.js" ]; then
    # Comment out or remove interface lines
    sed -i '' '/^interface/s/^/\/\/ /' src/contexts/AuthContext.js
    echo "Fixed AuthContext.js"
fi

echo "Done! Try running 'npm start' again."
