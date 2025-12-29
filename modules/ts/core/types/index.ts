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

export interface IGadget {
    id: string;
    title: string;
    description?: string;
    component: any;
    icon?: string;
    priority?: number;
    size?: 'small' | 'medium' | 'large';
    props?: Record<string, any>;
}

export interface IThemeConfig {
    mode: 'light' | 'dark' | 'system';
    primary?: string;
    primaryColor?: string;
    radius?: number;
    style?: string;
}

export interface IModuleState {
    [key: string]: any;
}
