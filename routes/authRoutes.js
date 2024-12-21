const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
        }

        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Onjuiste gegevens.' });
        }

        res.status(200).json({ message: 'Inloggen succesvol.' });
    } catch (error) {
        console.error('Fout bij login:', error);
        res.status(500).json({ error: 'Interne fout bij login.' });
    }
});
module.exports = router;