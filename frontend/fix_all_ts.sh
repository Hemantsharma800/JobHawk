#!/bin/bash
# Remove TypeScript syntax from all .js files
find src -name "*.js" -exec sed -i '' 's/<[^>]*>//g' {} \;
find src -name "*.js" -exec sed -i '' 's/: [A-Z][a-zA-Z]*\[\]//g' {} \;
find src -name "*.js" -exec sed -i '' 's/ as [a-zA-Z]*//g' {} \;
find src -name "*.js" -exec sed -i '' 's/([a-zA-Z]*: [a-zA-Z]*)/(\1)/g' {} \;
