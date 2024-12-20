const db = require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

(async () => {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
})();

const app = express();
app.use(bodyParser.json());

try {
    app.use('/api', userRoutes);
} catch (err) {
    console.error('Error setting up user routes:', err);
}

try {
    app.use('/api', taskRoutes);
} catch (err) {
    console.error('Error setting up task routes:', err);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));