import { Controller } from '@src/__framework/api/decorators/controller.decorator';
import { AppController, RouteHandler } from '../../__framework/api/app-builder';
import { Post } from '../../__framework/api/decorators/routes.decorator';

@Controller({ basePath: '/auth' })
class AuthController implements AppController {
  @Post({ path: 'sign-up' })
  signUp: RouteHandler = (ctx) => {
    return {
      status: 200,
      body: 'ok'
    }
  }

}

export default new AuthController();