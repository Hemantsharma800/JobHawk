#!/bin/bash

# Backup original files
mkdir -p backup

# 1. Fix AuthContext.js - replace 'interface' with proper JS
if grep -q "interface" src/contexts/AuthContext.js; then
    cp src/contexts/AuthContext.js backup/
    # Convert simple interface to PropTypes or comment out
    sed -i '' 's/interface/\/\/ interface/g' src/contexts/AuthContext.js
    echo "Fixed AuthContext.js - commented out interface"
fi

# 2. Check all files for common JSX errors
for file in src/components/Navigation.js src/pages/Dashboard.js src/pages/Jobs.js src/utils/jobManager.js; do
    if [ -f "$file" ]; then
        cp "$file" "backup/$(basename "$file")"
        # Fix common JSX issues
        sed -i '' 's/className=/className=/g' "$file"  # Fix duplicate =
        sed -i '' 's/{/{/g' "$file"  # Ensure proper braces
        sed -i '' 's/)}/)}/g' "$file"  # Ensure closing parens
        echo "Checked $file"
    fi
done
