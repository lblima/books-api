describe('Routes Users', () => {
    const Users = app.datasource.models.Users;
    const defaultUser = {
            id: 1,
            name: 'Default User',
            email: 'test@mail.com',
            password: 'test'
        };

    beforeEach(done => {
        Users
            .destroy({
                where: {}
            })
            .then(() => {
                Users.create(defaultUser);
            })
            .then(() => {
                done();
            })
    });

    describe('Route GET /Users', () => {
        it('should return a list of Users', done => {            
            request
                .get('/Users')
                .end((err, res) => {

                    expect(res.body[0].id).to.be.eql(defaultUser.id);
                    expect(res.body[0].name).to.be.eql(defaultUser.name);
                    expect(res.body[0].email).to.be.eql(defaultUser.email);

                    done(err);
                });
        });
    });

    describe('Route GET /Users/{id}', () => {
        it('should return a user', done => {
            request
                .get('/Users/1')
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(defaultUser.id);
                    expect(res.body.name).to.be.eql(defaultUser.name);
                    expect(res.body.email).to.be.eql(defaultUser.email);

                    done(err);
                });
        });
    });

    describe('Route POST /Users', () => {
        it('should create a user', done => {

            const newUser = {
                id: 2,
                name: 'newUser',
                email: 'newemail@mail.com',
                password: 'test'
            }

            request
                .post('/Users')
                .send(newUser)
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(newUser.id);
                    expect(res.body.name).to.be.eql(newUser.name);
                    expect(res.body.email).to.be.eql(newUser.email);

                    done(err);
                });
        });
    });

    describe('Route PUT /Users/{id}', () => {
        it('should update a user', done => {

            const updatedUser = {
                id: 1,
                name: 'updatedUser',
                email: 'updatedemail@mail.com'
            }

            request
                .put('/Users/1')
                .send(updatedUser)
                .end((err, res) => {

                    expect(res.body).to.be.eql([1]);

                    done(err);
                });
        });
    });

    describe('Route DELETE /Users/{id}', () => {
        it('should delete a user', done => {

            request
                .delete('/Users/1')
                .end((err, res) => {

                    expect(res.statusCode).to.be.eql(204);

                    done(err);
                });
        });
    });
});