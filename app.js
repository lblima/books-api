import Express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authorization from './auth';
import authRouter from './routes/auth';

const app = Express();

//Global config section
app.config = config;
app.datasource = datasource(app);

//Authorization section
const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

//General config section
app.set('port', 7000);
app.use(bodyParser.json());

//Routes section
booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;