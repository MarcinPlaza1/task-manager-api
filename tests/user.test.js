import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';
import Task from '../src/models/task.js';
import User from '../src/models/user.js';

describe('Task Management', () => {
    let token;
    let otherUserToken;

    before(async () => {
        await User.deleteMany();
        await Task.deleteMany();

        const user1 = await request(app)
            .post('/users/register')
            .send({ email: 'user1@example.com', password: 'strongPass123' });
        token = user1.body.token;

        const user2 = await request(app)
            .post('/users/register')
            .send({ email: 'user2@example.com', password: 'strongPass123' });
        otherUserToken = user2.body.token;
    });

    it('should create a task for a user', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New Task', description: 'This is a new task' });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('New Task');
    });

    it('should not allow access to another user\'s task', async () => {
        const taskResponse = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Task for User 1' });

        const getResponse = await request(app)
            .get(`/tasks/${taskResponse.body._id}`)
            .set('Authorization', `Bearer ${otherUserToken}`);
        expect(getResponse.status).to.equal(404);
    });

    it('should not create a task without a title', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ description: 'Missing title' });
        expect(response.status).to.equal(400);
    });

    it('should not create a task with a past deadline', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Task with past deadline',
                deadline: '2020-01-01T12:00:00Z'
            });
        expect(response.status).to.equal(400);
    });
});
