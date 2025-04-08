import Book from '#models/book';
import { bookValidator } from '#validators/book';
export default class BooksController {
    async index({ response }) {
        const books = await Book.all();
        return response.ok({ success: true, data: books });
    }
    async show({ params, response }) {
        const id = Number(params.id);
        if (isNaN(id) || id <= 0) {
            return response.badRequest({ success: false, message: 'Invalid book ID' });
        }
        const book = await Book.find(id);
        if (!book) {
            return response.notFound({ success: false, message: 'Book not found' });
        }
        return response.ok({ success: true, data: book });
    }
    async store({ request, response }) {
        const payload = await request.validateUsing(bookValidator);
        const book = await Book.create({
            title: payload.title,
            author: payload.author,
            publishedYear: payload.published_year
        });
        return response.created({ success: true, data: book });
    }
    async update({ params, request, response }) {
        const book = await Book.find(params.id);
        if (!book) {
            return response.notFound({ success: false, message: 'Book not found' });
        }
        const payload = await request.validateUsing(bookValidator);
        book.title = payload.title;
        book.author = payload.author;
        book.publishedYear = payload.published_year;
        await book.save();
        return response.ok({ success: true, data: book });
    }
    async destroy({ params, response }) {
        const book = await Book.find(params.id);
        if (!book) {
            return response.notFound({ success: false, message: 'Book not found' });
        }
        await book.delete();
        return response.ok({ success: true, message: 'Book deleted successfully' });
    }
}
//# sourceMappingURL=books_controller.js.map