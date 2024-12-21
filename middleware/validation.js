const db = require('../models/db');
const sanitizeInput = (input) => input.replace(/<[^>]+>/g, '').trim();

const validateUser = async (req, res, next) => {
    let { first_name, last_name, email, phone_number, password } = req.body;

    first_name = sanitizeInput(first_name);
    last_name = sanitizeInput(last_name);
    email = sanitizeInput(email);
    phone_number = sanitizeInput(phone_number);

    if (!first_name || typeof first_name !== 'string' || /\d/.test(first_name)) {
        return res.status(400).json({ error: 'Voornaam is verplicht, moet een string zijn en mag geen cijfers bevatten.' });
    }

    if (!last_name || typeof last_name !== 'string' || /\d/.test(last_name)) {
        return res.status(400).json({ error: 'Achternaam is verplicht, moet een string zijn en mag geen cijfers bevatten.' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Een geldig e-mailadres is verplicht.' });
    }

    if (!phone_number || typeof phone_number !== 'string' || !/^\+32[0-9]{9}$/.test(phone_number)) {
        return res.status(400).json({ error: 'Telefoonnummer is verplicht en moet beginnen met +32 gevolgd door 9 cijfers.' });
    }

    if (!password || typeof password !== 'string' || !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
        return res.status(400).json({ error: 'Wachtwoord moet minimaal 8 tekens bevatten, inclusief een hoofdletter, een kleine letter, een cijfer en een speciaal teken.' });
    }

    try {
        const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'E-mailadres is al in gebruik.' });
        }

        const [existingPhone] = await db.query('SELECT id FROM users WHERE phone_number = ?', [phone_number]);
        if (existingPhone.length > 0) {
            return res.status(400).json({ error: 'Telefoonnummer is al in gebruik.' });
        }
    } catch (error) {
        console.error('Databasefout bij het controleren van e-mail of telefoonnummer:', error);
        return res.status(500).json({ error: 'Er is een interne fout opgetreden.' });
    }

    next();
};

const validateTask = async (req, res, next) => {
    let { user_id, title, status, start_date, end_date } = req.body;
    title = sanitizeInput(title);

    if (!user_id || typeof user_id !== 'number') {
        return res.status(400).json({ error: 'Een geldig gebruiker-ID is verplicht.' });
    }

    if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({ error: 'Titel is verplicht, moet een string zijn en mag niet meer dan 100 tekens bevatten.' });
    }

    if (status && !['open', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Status moet "open" of "completed" zijn.' });
    }

    if (start_date && end_date) {
        const start = new Date(start_date);
        const end = new Date(end_date);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ error: 'Startdatum en einddatum moeten geldige datums zijn.' });
        }

        if (end <= start) {
            return res.status(400).json({ error: 'Einddatum moet na de startdatum vallen.' });
        }
    }

    try {
        const [user] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
        if (user.length === 0) {
            return res.status(400).json({ error: 'Gebruiker-ID bestaat niet.' });
        }
    } catch (error) {
        console.error('Databasefout bij het controleren van gebruiker-ID:', error);
        return res.status(500).json({ error: 'Er is een interne fout opgetreden.' });
    }
    next();
};
module.exports = { validateUser, validateTask };