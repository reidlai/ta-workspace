export interface IAppConfig {
    [key: string]: any;
}

export interface IContext {
    config: IAppConfig;
    register(key: string, service: any): void;
    getService<T>(key: string): T;
}

export interface IParamsRoute {
    path: string;
    component: any;
}

export interface IFeatureBundle {
    id: string;
    routes: IParamsRoute[];
    services?: Record<string, any>;
}

export type ModuleInit = (context: IContext) => Promise<IFeatureBundle>;
