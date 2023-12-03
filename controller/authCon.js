const admin = require('firebase-admin')
const { signInWithEmailAndPassword } = require('@firebase/auth')
const { auth } = require('../config/firebase')
const jwt = require('jsonwebtoken')

//need attention: body pake format x-www-urlencoded. kalo pake raw providernya jd anonymous jd gabisa login
//================================================================================================================
const signUp = async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        // Create user
        const userRecord = await admin.auth().createUser({
            displayName: user.username,
            email: user.email,
            password: user.password
        })

        res.json(userRecord)
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Sign In function
const signIn = async (req, res) => {
    try {
        console.log(req.body)
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        if (!user.email || !user.password) {
            return res.status(400).json({ error: 'All field is required' })
        }

        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)

        // Get additional user information if needed
        const userRecord = userCredential.user

        // Create a JWT token
        const token = jwt.sign({ id: userRecord.uid }, process.env.SECRET_KEY)

        res.status(200).json({ message: "Sign In successful", user: userRecord, token })
    } catch (error) {
        console.error('Error logging in user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

// Sign Out function
const signOut = async (req, res) => {
    try {
        await auth.signOut()

        res.status(200).json({ message: 'Sign Out successful' })
    } catch (error) {
        console.error('Error logging out user:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

//Get User Profile function
const getUserProfile = async (req, res) => {
    try {
        // Get user User ID from the decoded token
        const decodedToken = req.user

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error: 'Invalid token or missing UID' })
        }

        // Retrieve user information from Firebase Authentication
        const userRecord = await admin.auth().getUser(decodedToken.id)

        const userProfile = {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
        }

        res.status(200).json({ user: userProfile })
    } catch (error) {
        console.error('Error retrieving user profile:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = {signUp, signIn, signOut, getUserProfile}