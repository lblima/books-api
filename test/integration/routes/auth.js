import jwt from 'jwt-simple';
import HttpStatus from 'http-status';

describe('Routes Auth', () => {

    let token;
    let payload;

    const Users = app.datasource.models.Users;

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
                payload ={
                    id: user.id
                };

                token = jwt.encode(payload, app.config.jwtSecret);
                done();
            })
    });

    describe('Route POST /token', () => {
        it('should create a valid token when user pass correct info', done => {

            const userInfo = {
                "email": "leo@mail.com",
                "password": "123456"
            }

            request
                .post('/token')
                .send(userInfo)
                .end((err, res) => {

                    expect(res.statusCode).to.be.eql(200);
                    expect(res.body.token).to.be.eql(token);

                    done(err);
                });
        });

        it('should return UNAUTHORIZED if pass a incorrect user info', done => {

            const userInfo = {
                "email": "leo@mail.com",
                "password": "123456x"
            }

            request
                .post('/token')
                .send(userInfo)
                .end((err, res) => {
                    
                    expect(res.statusCode).to.be.eql(HttpStatus.UNAUTHORIZED);

                    done(err);
                });
        });
    });
});