#!/bin/bash
FILE="src/components/Navigation.js"

# First, check if we should use a different import
sed -i "s/import { SiLinkedin, SiIndeed, SiGlassdoor, SiAngelist, SiMonster } from 'react-icons\/si';/import { FiLinkedin, FiGlobe, FiBriefcase, FiUser, FiStar } from 'react-icons\/fi';/" "$FILE"

# Then replace usage in the file
sed -i "s/<SiLinkedin \/>/<FiLinkedin \/>/g" "$FILE"
sed -i "s/<SiIndeed \/>/<FiBriefcase \/>/g" "$FILE"
sed -i "s/<SiGlassdoor \/>/<FiGlobe \/>/g" "$FILE"
sed -i "s/<SiAngelist \/>/<FiUser \/>/g" "$FILE"
sed -i "s/<SiMonster \/>/<FiStar \/>/g" "$FILE"

echo "Icons replaced with Fi alternatives"
