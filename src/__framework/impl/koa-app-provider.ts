import Koa, { ParameterizedContext } from 'koa';
import bodyParser from 'koa-bodyparser';
import KoaRouter from 'koa-router';
import { App, AppController, RouteHandler } from '../api/app-builder';
import { getControllerDecoratorData } from '../api/decorators/controller.decorator';
import { getRouteDecoratorData } from '../api/decorators/routes.decorator';
import { HttpMethods } from '../api/types/app-builder.types';

const KOA_METHOD_HTTP_MAPPING: { [key in HttpMethods]: string } = {
  'GET': 'get',
  'POST': 'post',
  'PUT': 'put',
  'DELETE': 'delete'
}
export default class KoaApp implements App {
  private koaInstance: Koa
  constructor() {
    this.koaInstance = new Koa()
    this.koaInstance.use(bodyParser({ enableTypes: ['json', 'text'] }))
  }

  useController = (controller: AppController) => {
    console.log(Object.getOwnPropertyNames(controller));
    const basePath = getControllerDecoratorData(controller)?.basePath || ''
    const router = new KoaRouter()
    for (const property of Object.getOwnPropertyNames(controller)) {
      const metadata = getRouteDecoratorData(controller, property);
      if (metadata) {
        const koaMethod = KOA_METHOD_HTTP_MAPPING[metadata.method]
        const route = (router as any)[koaMethod]
        const routePath = metadata.path.length <= 1 ? basePath : `${basePath}/${metadata.path}`

        const koaRoute = route.bind(router)
        koaRoute(routePath, async (ctx: ParameterizedContext) => {
          const handler: RouteHandler = controller[property as (keyof AppController)]
          const response = await handler({
            body: ctx.request.body
          })
          ctx.status = response.status || 200
          ctx.body = response?.body
        })
        console.log(`Route ${routePath} of ${controller.constructor.name} initialized`)

      }
    }
    console.log(`Controller ${controller.constructor.name} initialized`)
    this.koaInstance.use(router.routes())
  }

  listen = (port: number) => {
    console.log(`App listening on port ${port}`)
    this.koaInstance.listen(port)
  }
}
