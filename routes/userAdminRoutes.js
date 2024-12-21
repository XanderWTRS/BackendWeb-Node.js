const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.status(200).json(users);
    } catch (error) {
        console.error('Fout bij het ophalen van gebruikers:', error);
        res.status(500).json({ error: 'Kon gebruikers niet ophalen.' });
    }
});

router.get('/users/search', async (req, res) => {
    const { first_name, isAdmin } = req.query;

    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    if (first_name) {
        query += ' AND first_name LIKE ?';
        params.push(`%${first_name}%`);
    }

    if (isAdmin !== undefined) {
        query += ' AND isAdmin = ?';
        params.push(parseInt(isAdmin));
    }

    try {
        const [users] = await db.query(query, params);
        res.status(200).json(users);
    } catch (error) {
        console.error('Fout bij zoeken naar gebruikers:', error);
        res.status(500).json({ error: 'Kon gebruikers niet ophalen.' });
    }
});
module.exports = router;