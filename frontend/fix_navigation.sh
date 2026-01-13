#!/bin/bash

echo "Fixing Navigation.js syntax errors..."

# Backup
cp src/components/Navigation.js src/components/Navigation.js.backup

# Fix line 100 - broken template string
# Original broken line seems to be:
# className='portal-btn ${connectedPortals[portal_id 'connected': '') ${activePortal === portal.id ? 'active-portal': '') }
# Should be:
# className={`portal-btn ${connectedPortals[portal.id] ? 'connected' : ''} ${activePortal === portal.id ? 'active-portal' : ''}`}

sed -i '' '100s/.*/  className={`portal-btn \${connectedPortals[portal.id] ? '"'"'connected'"'"' : '"'"''"'"'} \${activePortal === portal.id ? '"'"'active-portal'"'"' : '"'"''"'"'}`}/' src/components/Navigation.js

# Also fix line 101 - likely has: onClick=({ => handlePortalConnect(portal.id)}
# Should be: onClick={() => handlePortalConnect(portal.id)}
sed -i '' '101s/onClick=({ =>/onClick={() =>/' src/components/Navigation.js

# Fix line 102 - TypeScript syntax: style=({ '--portal-color': portal.color } as CSSProp)
# Should be: style={{ '--portal-color': portal.color }}
sed -i '' '102s/style=({.*} as CSSProp)/style={{\"'"'"'--portal-color'"'"'\": portal.color }}/' src/components/Navigation.js

echo "Fixed Navigation.js"
