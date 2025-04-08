import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth';
export default class AuthController {
    async register({ request }) {
        const data = await request.validateUsing(registerValidator);
        const user = await User.create(data);
        return User.accessTokens.create(user);
    }
    async login({ request, auth }) {
        const { email, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(email, password);
        return await auth.use('jwt').generate(user);
    }
    async logout() {
        return { message: 'Logged out successfully' };
    }
    async me({ auth }) {
        await auth.check();
        return auth.user;
    }
}
//# sourceMappingURL=auth_controller.js.map