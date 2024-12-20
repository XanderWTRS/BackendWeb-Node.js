const db = require('./models/db'); // Zorg dat dit pad klopt

(async () => {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
})();
