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
    const { limit = 10, offset = 0 } = req.query;

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

//UPDATE
router.put('/tasks/:id', validateTask, async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Titel is verplicht.' });
    }

    try {
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description || '', status || 'open', id]
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

module.exports = router;
