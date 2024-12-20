const validateUser = (req, res, next) => {
    const { first_name, last_name, email, phone_number } = req.body;

    if (!first_name || typeof first_name !== 'string') {
        return res.status(400).json({ error: 'Voornaam is verplicht en moet een string zijn.' });
    }

    if (!last_name || typeof last_name !== 'string') {
        return res.status(400).json({ error: 'Achternaam is verplicht en moet een string zijn.' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'Een geldig e-mailadres is verplicht.' });
    }

    if (!phone_number || typeof phone_number !== 'string' || !/^\+32[0-9]{9}$/.test(phone_number)) {
        return res.status(400).json({ error: 'Telefoonnummer is verplicht en moet beginnen met +32 gevolgd door 9 cijfers.' });
    }

    next();
};

module.exports = { validateUser };
