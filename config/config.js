export default {
    database: 'books',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        // storage: `${process.env.NODE_ENV}_books.sqlite`,
        storage: 'books.sqlite',
        define: {
            underscore: true
        }
    },
    jwtSecret: 'Sec3t',
    jwtSession: {
        session: false
    }
};