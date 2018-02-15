import jwt from 'jwt-simple';

describe('Routes Books', () => {
    const Books = app.datasource.models.Books;
    const Users = app.datasource.models.Users;
    const jwtSecret = app.config.jwtSecret;

    const defaultBook = {
        id: 1,
        name: 'Default Book',
        description: 'Deafault description'
    };

    let token;

    beforeEach(done => {
        Users
            .destroy({
                where: {}
            })
            .then(() => Users.create({
                name: 'Leonardo Lima',
                email: 'leo@mail.com',
                password: '123456'
            }))
            .then(user => {
                Books
                    .destroy({
                        where: {}
                    })
                    .then(() => {
                        Books.create(defaultBook);
                    })
                    .then(() => {
                        token = jwt.encode({
                            id: user.id
                        }, jwtSecret);
                        done();
                    })
            });
    });

    describe('Route GET /books', () => {
        it('should return a list of books', done => {     
             
            const bookList = joi.array().items(joi.object().keys({
                id: joi.number(),
                name: joi.string(), 
                description: joi.string(), 
                createdAt: joi.date().iso(),
                updatedAt: joi.date().iso()
            }));

            request
                .get('/books') 
                .set('Authorization', `bearer ${token}`)
                .end((err, res) => {

                    joiAssert(res.body, bookList);

                    done(err);
                });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('should return a book', done => {

            const book = joi.object().keys({
                id: joi.number(),
                name: joi.string(), 
                description: joi.string(), 
                createdAt: joi.date().iso(),
                updatedAt: joi.date().iso()
            });

            request
                .get('/books/1')
                .set('Authorization', `bearer ${token}`)
                .end((err, res) => {
                    joiAssert(res.body, book);
                    done(err);
                });
        });
    });

    describe('Route POST /books', () => {
        it('should create a book', done => {

            const newBook = {
                id: 2,
                name: 'newBook',
                description: 'new description', 
            }

            const book = joi.object().keys({
                id: joi.number(),
                name: joi.string(), 
                description: joi.string(), 
                createdAt: joi.date().iso(),
                updatedAt: joi.date().iso()
            });

            request
                .post('/books')
                .set('Authorization', `bearer ${token}`)
                .send(newBook)
                .end((err, res) => {

                    joiAssert(res.body, book);
                    done(err);
                });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('should update a book', done => {

            const updatedBook = {
                id: 1,
                name: 'updatedBook'
            }

            const updatedBookCount = joi.array().items(1);

            request
                .put('/books/1')
                .set('Authorization', `bearer ${token}`)
                .send(updatedBook)
                .end((err, res) => {

                    joiAssert(res.body, updatedBookCount);

                    done(err);
                });
        });
    });

    describe('Route DELETE /books/{id}', () => {
        it('should delete a book', done => {

            request
                .delete('/books/1')
                .set('Authorization', `bearer ${token}`)
                .end((err, res) => {

                    expect(res.statusCode).to.be.eql(204);

                    done(err);
                });
        });
    });
});