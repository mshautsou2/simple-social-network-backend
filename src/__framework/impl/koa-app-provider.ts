import { App, RouteHandler } from '../api/app-builder';
import { getRouteDecoratorData, Route } from '../api/decorators/route.decorator';
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

export default class KoaApp implements App {
    private koaInstance
    constructor() {
      this.koaInstance = new Koa()
    }
    
  useController = (controller) => {
    console.log(Object.getOwnPropertyNames(controller));
    const router = new KoaRouter()
    for (const property of Object.getOwnPropertyNames(controller)) {
      const metadata = getRouteDecoratorData(controller, property);
      if (metadata) {
          console.log(metadata);
          if (metadata.method === 'GET') {
            router.get(metadata.path, async (ctx) => {
              const handler: RouteHandler = controller[property]
              const response = await handler({})
              ctx.status = response.status || 200
              ctx.body = response?.body
              // console.log('request', ctx)
            })
          } else if (metadata.method === 'POST') {
            router.post(metadata.path, controller[property])
          }
          
      }
    }
    console.log(`Controller ${controller.constructor.name} initialized`)
    this.koaInstance.use(router.routes())
  }

  listen = (port) => {
    console.log(`App listening on port ${port}`)
    this.koaInstance.listen(port)
  }
}
