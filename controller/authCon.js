const { getAuth, signInWithEmailAndPassword, signOut } = require('@firebase/auth');
const firebaseConfig = require('../config/firebase');
const admin = require('firebase-admin')
const verifyToken = require('../config/verifyToken')

const userAuth = getAuth();

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
            password: user.password,
            emailVerified: false,
            disabled: false
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
        const user = {
            email: req.body.email,
            password: req.body.password
        }

        // Melakukan sign in dengan Firebase Authentication
        const signInResponse = await admin.auth().signInWithEmailAndPassword(user.email, user.password);

        // Mendapatkan informasi tambahan tentang pengguna, termasuk providerData
        const detailedUserRecord = await admin.auth().getUser(signInResponse.user.uid);

        // Mengirim respons dengan informasi pengguna termasuk providerData
        res.json(detailedUserRecord);
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {signUp, signIn}