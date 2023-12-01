const jwt = require('jsonwebtoken');
const secretKey = process.env.TOKEN_SECRET_KEY;

// Middleware untuk memverifikasi token
const verifikasiToken = (req, res, next) => {
    // Mendapatkan token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token tidak ada' });
    }

    // Mengekstrak token dari header Authorization
    const token = authHeader.split(' ')[1];

    // verifikasi token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid' });
        }

        // Token valid, tambahkan decoded user ke objek permintaan
        req.user = decoded;
        next();
    });
};

module.exports = verifikasiToken;