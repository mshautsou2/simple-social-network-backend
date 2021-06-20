import { AppController, RouteHandler } from '../../__framework/api/app-builder';
import { Route } from '../../__framework/api/decorators/route.decorator';

class UserController implements AppController {
  @Route({ method: 'GET', path: '/' })
  getUsers: RouteHandler = () => {
    return {
      status: 200,
      body: 'ok'
    }
  }

}

export default new UserController();