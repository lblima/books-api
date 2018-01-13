import Express from 'express';

const app = Express();

app.route('/books')
    .get((req, res) => {
        res.json([
            {
                id: 1,
                name: 'Default Book'
            }
        ]);
    });

export default app;