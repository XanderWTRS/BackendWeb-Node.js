const db = require('../models/db');

const validateUser = async (req, res, next) => {
    const { first_name, last_name, email, phone_number } = req.body;

    if (!first_name || typeof first_name !== 'string') {
        return res.status(400).json({ error: 'Voornaam is verplicht en moet een string zijn.' });
    }

    if (!last_name || typeof last_name !== 'string') {
        return res.status(400).json({ error: 'Achternaam is verplicht en moet een string zijn.' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Een geldig e-mailadres is verplicht.' });
    }

    if (!phone_number || typeof phone_number !== 'string' || !/^\+32[0-9]{9}$/.test(phone_number)) {
        return res.status(400).json({ error: 'Telefoonnummer is verplicht en moet beginnen met +32 gevolgd door 9 cijfers.' });
    }

    try {
        const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'E-mailadres is al in gebruik.' });
        }
    } catch (error) {
        console.error('Databasefout bij het controleren van e-mail:', error);
        return res.status(500).json({ error: 'Er is een interne fout opgetreden.' });
    }

    next();
};


const validateTask = (req, res, next) => {
    const { user_id, title, status } = req.body;

    if (!user_id || typeof user_id !== 'number') {
        return res.status(400).json({ error: 'Een geldig gebruiker-ID is verplicht.' });
    }

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Titel is verplicht en moet een string zijn.' });
    }

    if (status && !['open', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Status moet "open" of "completed" zijn.' });
    }

    next();
};

module.exports = { validateUser , validateTask };
