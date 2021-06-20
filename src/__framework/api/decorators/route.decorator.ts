import 'reflect-metadata';

const ROUTE_METADATA_KEY = Symbol('route');

export const Route = ({ method, path }: { method: 'GET' | 'PUT' | 'POST' | 'DELETE', path: string }) => Reflect.metadata(ROUTE_METADATA_KEY, {
  method,
  path,
});

export const getRouteDecoratorData = (target: any, propertyKey: string) => Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);
