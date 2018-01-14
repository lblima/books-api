import BooksController from '../../../controllers/books';

describe('Controller Books', () => {
    describe('Get all books: GetAll()', () => {
        it('should return a list of books', () => {
            const Books = {
                findAll: td.function()
            };

            const expectedResponse = [{
                id: 1,
                name: 'Test Book',
                created_at: '2018-01-14 14:47:31.938 +00:00',
                updated_at: '2018-01-14 14:47:31.938 +00:00'
            }];

            td.when(Books.findAll({})).thenResolve(expectedResponse);

            const booksController = new BooksController(Books);

            return booksController.getAll()
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });
});