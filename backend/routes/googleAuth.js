const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// In-memory database simulation
let users = [];

// Helper: Generate secure user ID
const generateUserId = () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper: Create JWT token
const createToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            authMethod: 'google'
        },
        process.env.JWT_SECRET || 'your_super_secure_jwt_secret_key_change_in_production',
        { expiresIn: '30d' } // Longer expiry for convenience
    );
};

// Helper: Find or create user
const findOrCreateUser = (googleData) => {
    // Check if user exists
    let user = users.find(u => u.email === googleData.email);
    
    if (!user) {
        // Create new user
        user = {
            id: generateUserId(),
            name: googleData.name,
            email: googleData.email,
            profilePicture: googleData.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(googleData.name)}&background=random&size=128`,
            authMethod: 'google',
            emailVerified: true,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            settings: {
                emailNotifications: true,
                jobAlerts: true,
                darkMode: false
            }
        };
        users.push(user);
        console.log(`✅ New Google user created: ${user.email}`);
    } else {
        // Update last login for existing user
        user.lastLogin = new Date().toISOString();
        console.log(`✅ Existing Google user logged in: ${user.email}`);
    }
    
    return user;
};

// SIMULATED GOOGLE AUTH ENDPOINT (for development)
// This mimics Google OAuth without requiring actual Google API keys
router.post('/simulated-google-auth', (req, res) => {
    try {
        console.log('📱 Google Auth Request Received');
        
        const { email, name, picture } = req.body;
        
        // Basic validation
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email and name are required'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Prepare user data
        const googleData = {
            email: email.trim().toLowerCase(),
            name: name.trim(),
            picture: picture || null
        };
        
        // Find or create user
        const user = findOrCreateUser(googleData);
        
        // Create JWT token
        const token = createToken(user);
        
        // Prepare response
        const response = {
            success: true,
            message: 'Google authentication successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                authMethod: user.authMethod,
                createdAt: user.createdAt,
                settings: user.settings
            },
            token: token
        };
        
        console.log(`✅ Google Auth Successful for: ${user.email}`);
        
        // Send success response
        res.status(200).json(response);
        
    } catch (error) {
        console.error('❌ Google Auth Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error during authentication',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        service: 'Google Authentication Service',
        status: 'operational',
        timestamp: new Date().toISOString(),
        usersCount: users.length
    });
});

// Get all users (for debugging only - remove in production)
router.get('/debug/users', (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }
    
    const usersWithoutSensitiveData = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        authMethod: user.authMethod,
        createdAt: user.createdAt
    }));
    
    res.json({
        success: true,
        users: usersWithoutSensitiveData,
        count: users.length
    });
});

module.exports = router;
