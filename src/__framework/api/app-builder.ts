import KoaApp from '../impl/koa-app-provider';

export interface App {
    useController(controller: AppController): void;
    listen(port: number): void
}
export interface AppController {
}

export type RouteHandler = (ctx) => { status?: number, body?: any }

export const createApp = (providerName: 'koa' | 'express' | 'fastify' | 'hapi'): App => {
  if (providerName !== 'koa') {
    throw new Error('Provider not supported yet');
  }
  return new KoaApp();
};
