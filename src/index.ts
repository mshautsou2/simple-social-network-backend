import authController from './features/auth/auth.controller';
import userController from './features/users/user.controller';
import { createApp } from './__framework/api/app-builder';

const app = createApp('koa');
app.useController(userController);
app.useController(authController)

app.listen(4000)