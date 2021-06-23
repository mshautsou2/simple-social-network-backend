import { Controller } from '@src/__framework/api/decorators/controller.decorator';
import { Get } from '@src/__framework/api/decorators/routes.decorator';
import { AppController, RouteHandler } from '../../__framework/api/app-builder';
@Controller({ basePath: 'users'})
class UserController implements AppController {
  @Get({ path: '/' })
  getUsers: RouteHandler = (ctx) => {
    console.log(ctx)
    return {
      status: 200,
      body: 'ok'
    }
  }

}

export default new UserController();