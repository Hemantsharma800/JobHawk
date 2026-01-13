#!/bin/bash
NAV_FILE=$(find src -name "*Navigation*" -type f \( -name "*.js" -o -name "*.jsx" \) | head -1)
echo "Found Navigation file: $NAV_FILE"
echo ""
echo "Imports in Navigation:"
grep "^import" "$NAV_FILE"
echo ""
echo "Checking each import..."
grep "^import" "$NAV_FILE" | while read line; do
  # Extract the import path
  PATH_PART=$(echo "$line" | grep -o "from '.*'" | sed "s/from '\(.*\)'/\1/")
  COMP_NAME=$(echo "$line" | grep -o "import.*from" | sed "s/import \(.*\) from/\1/" | tr -d '{} ')
  
  if [[ "$PATH_PART" == *"./"* ]]; then
    ABS_PATH="src/${PATH_PART#*../}"
    # Try to find the file
    FIND_RESULT=$(find src -path "*${PATH_PART}*" \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) | head -1)
    if [ -n "$FIND_RESULT" ]; then
      echo "Checking $COMP_NAME from $PATH_PART:"
      if grep -q "export.*$COMP_NAME\|export default.*$COMP_NAME" "$FIND_RESULT" 2>/dev/null; then
        echo "  ✓ Found export"
      else
        echo "  ✗ NO EXPORT FOUND for '$COMP_NAME' in $FIND_RESULT"
        echo "  Exports in file:"
        grep "export" "$FIND_RESULT"
      fi
    else
      echo "  ? Could not find file for $PATH_PART"
    fi
  fi
done
