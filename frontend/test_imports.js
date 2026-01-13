// Test each import separately
try {
  const fi = require('react-icons/fi');
  console.log('Fi icons loaded:', Object.keys(fi).length);
} catch(e) { console.log('Fi error:', e.message); }

try {
  const md = require('react-icons/md');
  console.log('Md icons loaded:', Object.keys(md).length);
} catch(e) { console.log('Md error:', e.message); }

try {
  const si = require('react-icons/si');
  console.log('Si icons loaded:', Object.keys(si).length);
} catch(e) { console.log('Si error:', e.message); }
