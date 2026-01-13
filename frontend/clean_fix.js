// Find and fix the entire button component
const fs = require('fs');
let content = fs.readFileSync('src/components/Navigation.js', 'utf8');

// Fix the broken template string pattern
content = content.replace(
  /className='portal-btn \$\{connectedPortals\[portal_id[\s\S]*?'active-portal': ''\) \}/,
  'className={`portal-btn ${connectedPortals[portal.id] ? "connected" : ""} ${activePortal === portal.id ? "active-portal" : ""}`}'
);

// Fix onClick
content = content.replace(/onClick=\(\{ =>/g, 'onClick={() =>');

// Fix style prop with TypeScript syntax
content = content.replace(/style=\(\{.*\} as CSSProp\)/g, 'style={{"--portal-color": portal.color}}');

fs.writeFileSync('src/components/Navigation.js', content);
console.log('Fixed Navigation.js');
