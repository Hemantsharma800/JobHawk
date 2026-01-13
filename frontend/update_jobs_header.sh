#!/bin/bash
FILE="src/components/Jobs.js"
# Read the file and create a new version
content=$(cat "$FILE")

# Remove the Container wrapper at the beginning and replace
new_content=$(echo "$content" | sed 's/<Container maxWidth="xl" sx={{ py: 3 }}>/<Box sx={{ py: 2 }}>/g')

# Write back
echo "$new_content" > "$FILE"

echo "Updated Jobs.js for dashboard"
