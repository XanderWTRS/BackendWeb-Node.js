const db = require('../models/db');

const validateUser = async (req, res, next) => {
    const { first_name, last_name, email, phone_number } = req.body;

    if (!first_name || typeof first_name !== 'string' || /\d/.test(first_name)) {
        return res.status(400).json({ 
            error: 'Voornaam is verplicht, moet een string zijn en mag geen cijfers bevatten.' 
        });
    }

    if (!last_name || typeof last_name !== 'string' || /\d/.test(last_name)) {
        return res.status(400).json({ 
            error: 'Achternaam is verplicht, moet een string zijn en mag geen cijfers bevatten.' 
        });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Een geldig e-mailadres is verplicht.' });
    }

    if (!phone_number || typeof phone_number !== 'string' || !/^\+32[0-9]{9}$/.test(phone_number)) {
        return res.status(400).json({ 
            error: 'Telefoonnummer is verplicht en moet beginnen met +32 gevolgd door 9 cijfers.' 
        });
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
    const { user_id, title, status, start_date, end_date } = req.body;

    if (!user_id || typeof user_id !== 'number') {
        return res.status(400).json({ error: 'Een geldig gebruiker-ID is verplicht.' });
    }

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Titel is verplicht en moet een string zijn.' });
    }

    if (status && !['open', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Status moet "open" of "completed" zijn.' });
    }

    if (start_date && end_date) {
        const start = new Date(start_date);
        const end = new Date(end_date);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ 
                error: 'Startdatum en einddatum moeten geldige datums zijn.' 
            });
        }

        if (end <= start) {
            return res.status(400).json({ 
                error: 'Einddatum moet na de startdatum vallen.' 
            });
        }
    }

    next();
};

module.exports = { validateUser, validateTask };
