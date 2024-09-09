import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import './notifications/reminders.js';
import { swaggerUi, swaggerDocs } from './swagger.js';
import connectDB from './db.js';

const app = express();

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(`Swagger dostępny pod adresem: http://localhost:3002/api-docs`);

app.use(helmet());

app.use(xss());

app.use(cookieParser());

if (process.env.NODE_ENV !== 'test') {
    app.use(csurf({ cookie: true }));
}

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

app.get('/', (req, res) => {
    res.send('Task Manager API');
});

export default app;
