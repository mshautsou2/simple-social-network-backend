import 'reflect-metadata';
import { AppController } from '../app-builder';

const CONTROLLER_METADATA_KEY = Symbol('controller');

export const Controller = ({ basePath }: { basePath: string}): ClassDecorator =>  {
    return (target: AppController) => {
        Reflect.defineMetadata(CONTROLLER_METADATA_KEY, { basePath }, (target as any).prototype)
    }
}
export const getControllerDecoratorData = (target: any) => Reflect.getMetadata(CONTROLLER_METADATA_KEY, target);
