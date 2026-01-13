const fs = require('fs');

const files = [
  'src/components/AIJobAnalysis.js',
  'src/components/Jobs.js',
  'src/services/AIService.js'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasOmui = content.includes('Omui');
    const hasMui = content.includes('@mui');
    const hasGoogleAI = content.includes('@google/generative-ai');
    
    console.log(`${file}:`);
    console.log(`  Has Omui typo: ${hasOmui ? '❌ YES' : '✅ No'}`);
    console.log(`  Has @mui: ${hasMui ? '✅ Yes' : '❌ No'}`);
    if (file.includes('AIService')) {
      console.log(`  Has Google AI: ${hasGoogleAI ? '✅ Yes' : '❌ No'}`);
    }
    console.log('');
  } else {
    console.log(`${file}: ❌ File not found`);
  }
});
