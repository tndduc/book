import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  /**
   * @register
   * @description Đăng ký tài khoản mới
   * @tags Auth
   * 
   * @requestBody {"email": "string", "password": "string"}
   
   */
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    return User.accessTokens.create(user)
  }

  /**
   * @login
   * @description Đăng nhập
   * @tags Auth
   *
   * @requestBody {"email": "string", "password": "string"}
   * @responseBody 200 - {"success": true, "data": {"access_token": "string"}, "message": "Đăng nhập thành công"}
   * @responseBody 401 - {"success": false, "message": "Sai mật khẩu"}
   */
  async login({ request,auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    return await auth.use('jwt').generate(user)
  }

  /**
   * @logout
   * @description Đăng xuất
   * @tags Auth
   *
   * @security BearerAuth
   * @responseBody 200 - {
   *   "success": true,
   *   "message": "Đăng xuất thành công"
   * }
   * @responseBody 401 - {
   *   "success": false,
   *   "message": "Chưa đăng nhập"
   * }
   */
  async logout({ auth }: HttpContext) {
  
    return { message: 'Logged out successfully' }
  }

  /**
   * @me
   * @description Lấy thông tin người dùng hiện tại
   * @tags Auth
   *
   * @security BearerAuth
   * @responseBody 200 - {
   *   "success": true,
   *   "data": {
   *     "id": 1,
   *     "email": "user@example.com",
   *     "full_name": "Nguyen Van A"
   *   }
   * }
   * @responseBody 401 - {
   *   "success": false,
   *   "message": "Chưa đăng nhập"
   * }
   */
  async me({ auth }: HttpContext) {
    await auth.check()
    return auth.user
  }

}
