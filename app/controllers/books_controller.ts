import Book from '#models/book'
import { bookValidator } from '#validators/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  /**
   * @index
   * @description Lấy danh sách tất cả sách
   * @tags Book
   * 
   * @responseBody 200 - {
   *   "success": true,
   *   "data": [
   *     {
   *       "id": 1,
   *       "title": "Book Title",
   *       "author": "Author Name",
   *       "published_year": 2020
   *     }
   *   ]
   * }
   */
  public async index({ response }: HttpContext) {
    const books = await Book.all()
    return response.ok({ success: true, data: books })
  }

  /**
   * @show
   * @description Lấy thông tin chi tiết một cuốn sách
   * @tags Book
   * 
   * @responseBody 200 - {
   *   "success": true,
   *   "data": {
   *     "id": 1,
   *     "title": "Book Title",
   *     "author": "Author Name",
   *     "published_year": 2020
   *   }
   * }
   * @responseBody 404 - {
   *   "success": false,
   *   "message": "Book not found"
   * }
   */
  public async show({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (isNaN(id) || id <= 0) {
      return response.badRequest({ success: false, message: 'Invalid book ID' })
    }
  
    const book = await Book.find(id)
  
    if (!book) {
      return response.notFound({ success: false, message: 'Book not found' })
    }
  
    return response.ok({ success: true, data: book })
  }
  /**
   * @store
   * @description Thêm sách mới
   * @tags Book
   * 
   * @requestBody { "title": "string","author": "string","published_year": 2020}
   * @responseBody 201 - {
   *   "success": true,
   *   "data": {
   *     "id": 1,
   *     "title": "Book Title",
   *     "author": "Author Name",
   *     "published_year": 2020
   *   }
   * }
   * @responseBody 422 - {
   *   "success": false,
   *   "message": "Validation error"
   * }
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(bookValidator)
    const book = await Book.create({
      title: payload.title,
      author: payload.author,
      publishedYear: payload.published_year
    })
    return response.created({ success: true, data: book })
  }

  /**
   * @update
   * @description Cập nhật thông tin sách
   * @tags Book
   * @requestBody { "title": "string","author": "string","published_year": 2020} 
   * @responseBody 200 - {
   *   "success": true,
   *   "data": {
   *     "id": 1,
   *     "title": "Updated Title",
   *     "author": "Updated Author",
   *     "published_year": 2021
   *   }
   * }
   * @responseBody 404 - {
   *   "success": false,
   *   "message": "Book not found"
   * }
   */
  public async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ success: false, message: 'Book not found' })
    }
    const payload = await request.validateUsing(bookValidator)
    book.title = payload.title
    book.author = payload.author
    book.publishedYear = payload.published_year
    await book.save()
    return response.ok({ success: true, data: book })
  }

  /**
   * @destroy
   * @description Xóa sách
   * @tags Book
   * @responseBody 200 - {
   *   "success": true,
   *   "message": "Book deleted successfully"
   * }
   * @responseBody 404 - {
   *   "success": false,
   *   "message": "Book not found"
   * }
   */
  public async destroy({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.notFound({ success: false, message: 'Book not found' })
    }
    await book.delete()
    return response.ok({ success: true, message: 'Book deleted successfully' })
  }
}
