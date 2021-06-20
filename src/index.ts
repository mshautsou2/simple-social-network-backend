import userController from './features/users/user.controller';
import { createApp } from './__framework/api/app-builder';

const app = createApp('koa');
app.useController(userController);

app.listen(3000)