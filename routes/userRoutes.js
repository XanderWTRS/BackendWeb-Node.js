const express = require('express');
const router = express.Router();
const db = require('../models/db');

//CREATE
router.post('/users', async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Naam en e-mail zijn verplicht.' });
    }

    try {
        const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ message: 'Gebruiker toegevoegd.', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon gebruiker niet toevoegen.' });
    }
});

//READ all
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon gebruikers niet ophalen.' });
    }
});

//READ one
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
        }
        res.status(200).json(user[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon gebruiker niet ophalen.' });
    }
});

//WIJZIG
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Naam en e-mail zijn verplicht.' });
    }

    try {
        const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
        }
        res.status(200).json({ message: 'Gebruiker bijgewerkt.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon gebruiker niet bijwerken.' });
    }
});

//DELETE
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Gebruiker niet gevonden.' });
        }
        res.status(200).json({ message: 'Gebruiker verwijderd.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon gebruiker niet verwijderen.' });
    }
});

module.exports = router;
