const admin = require('firebase-admin')
const { verifyToken } = require('../middleware/auth-middleware')
const { getAuth, signInWithEmailAndPassword } = require('@firebase/auth');
const { app, auth } = require('../config/firebase')
const jwt = require('jsonwebtoken')

//===============================================================

const signUp = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        // Membuat pengguna di Firebase Authentication
        const userRecord = await admin.auth().createUser({
            displayName: user.username,
            email: user.email,
            password: user.password
        });

        // Mengirim respons dengan informasi pengguna termasuk providerData
        res.json(userRecord);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//belom jalan
const signIn = async (req, res) => {
    try {
        console.log(req.body);
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        // Check if email is provided
        if (!user.email || !user.password) {
            return res.status(400).json({ error: 'All field is required' });
        }

        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);

        // Get additional user information if needed
        const userRecord = userCredential.user;

        // Create a JWT token
        const token = jwt.sign({ id: userRecord.uid }, process.env.SECRET_KEY)

        // Send response with user information and token
        res.status(200).json({ message: "Login successful", user: userRecord, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {signUp, signIn}