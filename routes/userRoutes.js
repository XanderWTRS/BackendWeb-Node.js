const express = require('express');
const router = express.Router();
const db = require('../models/db');
const {validateUser} = require('../middleware/validation');

//CREATE
router.post('/users', validateUser, async (req, res) => {
    const { first_name, last_name, email, phone_number } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO users (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, phone_number]
        );
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
router.put('/users/:id', validateUser, async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_number = ? WHERE id = ?',
            [first_name, last_name, email, phone_number, id]
        );
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
