import 'reflect-metadata';
import { HttpMethods } from '../types/app-builder.types';

const ROUTE_METADATA_KEY = Symbol('route');

interface RouterDecoratorMetadata {
  method: HttpMethods
  path: string
}
export const Route = ({ method, path }: { method: 'GET' | 'PUT' | 'POST' | 'DELETE', path: string }) => Reflect.metadata(ROUTE_METADATA_KEY, {
  method,
  path,
});

export const Get = ({ path }: { path: string}) => Route({ method: 'GET', path })
export const Post = ({ path }: { path: string}) => Route({ method: 'POST', path })

export const getRouteDecoratorData = (target: any, propertyKey: string): RouterDecoratorMetadata => Reflect.getMetadata(ROUTE_METADATA_KEY, target, propertyKey);
