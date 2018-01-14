import Express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';

const app = Express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const Books = app.datasource.models.Books;

booksRouter(app, Books);

export default app;