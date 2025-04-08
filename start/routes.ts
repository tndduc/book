/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";
import { middleware } from './kernel.js';
const AuthController = () => import('#controllers/auth_controller')
const BooksController = () => import('#controllers/books_controller')
// returns swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead. If you want, you can pass proxy url as second argument here.
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
});
router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.post('/logout', [AuthController, 'logout']).as('auth.logout')
router.get('/me', [AuthController, 'me']).as('auth.me')


router.group(() => {
  router.get('/books', [BooksController, "index"]).as('books.index')
  router.get('/books/:id', [BooksController, 'show']).as('books.show')
  router.post('/books', [BooksController, "store"]).as('books.store')
  router.put('/books/:id', [BooksController, "update"]).as('books.update')
  router.delete('/books/:id', [BooksController, "destroy"]).as('books.destroy')
}).use(middleware.auth())