import express from 'express';
import User from '../models/user.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: New user registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation error
 */
router.post('/users/register', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log('Error during user registration:', e);
        res.status(400).send(e);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Login error
 */
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: 'Incorrect login!' });
        }

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Incorrect password!' });
        }

        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logging out the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       500:
 *         description: Server error
 */
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Downloading a user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Please log in
 */
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

export default router;