const express = require('express');
const router = express.Router();
const db = require('../models/db');
const {validateUser , validateTask} = require('../middleware/validation');

//CREATE
router.post('/tasks', validateTask, async (req, res) => {
    const { user_id, title, description, status } = req.body;

    if (!user_id || !title) {
        return res.status(400).json({ error: 'Gebruiker-ID en titel zijn verplicht.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
            [user_id, title, description || '', status || 'open']
        );
        res.status(201).json({ message: 'Taak toegevoegd.', taskId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon taak niet toevoegen.' });
    }
});

//READ all
router.get('/tasks', async (req, res) => {
    const { limit = 5, offset = 0 } = req.query;

    try {
        const [tasks] = await db.query('SELECT * FROM tasks LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon taken niet ophalen.' });
    }
});

//READ one
router.get('/tasks/user/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon taken niet ophalen.' });
    }
});

//UPDATE TASKS
router.put('/tasks/:id', validateTask, async (req, res) => {
    const { id } = req.params;
    const { user_id, title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Titel is verplicht.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE tasks SET user_id = ?, title = ?, description = ?, status = ? WHERE id = ?',
            [user_id, title, description || '', status || 'open', id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Taak niet gevonden.' });
        }
        res.status(200).json({ message: 'Taak bijgewerkt.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon taak niet bijwerken.' });
    }
});

//UPDATE TAAK STATUS
router.put('/tasks/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['open', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Ongeldige statuswaarde. Moet "open" of "completed" zijn.' });
    }
    try {
        const [task] = await db.query('SELECT status FROM tasks WHERE id = ?', [id]);

        if (!task.length) {
            return res.status(404).json({ error: 'Taak niet gevonden.' });
        }

        const currentStatus = task[0].status;

        if (currentStatus === 'completed' && status === 'open') {
            return res.status(400).json({ error: 'Een voltooide taak kan niet opnieuw op "open" worden gezet.' });
        }

        let completedAt = null;
        if (status === 'completed') {
            completedAt = new Date();
        }

        await db.query(
            'UPDATE tasks SET status = ?, completed_at = ? WHERE id = ?',
            [status, completedAt, id]
        );

        res.status(200).json({ message: 'Taakstatus succesvol bijgewerkt.' });
    } catch (error) {
        console.error('Fout bij het bijwerken van taakstatus:', error);
        res.status(500).json({ error: 'Er ging iets mis bij het bijwerken van de taakstatus.' });
    }
});



//DELETE
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Taak niet gevonden.' });
        }
        res.status(200).json({ message: 'Taak verwijderd.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon taak niet verwijderen.' });
    }
});

//FILTEREN
router.get('/tasks/search', async (req, res) => {
    const { title, status } = req.query;

    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (title) {
        query += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }

    try {
        const [tasks] = await db.query(query, params);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kon taken niet zoeken.' });
    }
});


module.exports = router;
