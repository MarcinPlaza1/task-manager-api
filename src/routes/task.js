import express from 'express';
import Task from '../models/task.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Creating a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New task"
 *               description:
 *                 type: string
 *                 example: "Description task"
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-12-31T12:00:00Z"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["work", "urgent"]
 *     responses:
 *       201:
 *         description: Task successfully created
 *       400:
 *         description: Validation error
 */
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: downloading the task list
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           example: "true"
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *           example: "urgent"
 *     responses:
 *       200:
 *         description: Task list
 *       500:
 *         description: Server error
 */
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.tag) {
        match.tags = { $in: [req.query.tag] };
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const tasks = await Task.find({ owner: req.user._id, ...match })
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(sort);
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Downloading one job by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           example: "603d2149f383ad1f4c4d7d55"
 *     responses:
 *       200:
 *         description: Task successfully downloaded
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

// Updating a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'completed', 'deadline', 'tags'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Nieprawidłowe aktualizacje!' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Delete task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

export default router;