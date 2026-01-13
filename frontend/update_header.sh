#!/bin/bash
FILE="src/components/Jobs.js"

# Create a new header section
NEW_HEADER='      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: "primary.main",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 3
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="white">
              G
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" fontWeight="bold" color="primary" sx={{ lineHeight: 1 }}>
              GLIXTRON
            </Typography>
            <Typography variant="h5" color="secondary.main" sx={{ lineHeight: 1.2 }}>
              AI CareerConnect Platform
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="h6" color="text.secondary" paragraph>
          Powered by Glixtron AI - Upload your resume and let our advanced AI analyze it, 
          generate tailored versions for specific jobs, and get personalized career recommendations.
        </Typography>'

# Replace the header section (lines 68-76 approximate)
sed -i '' '68,76c\
'"$NEW_HEADER"'
' "$FILE"

echo "Updated header with Glixtron branding"
