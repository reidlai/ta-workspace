declare module "resclient" {
  export default class ResClient {
    constructor(url: string, options?: any);
    get(rid: string): Promise<any>;
    call(rid: string, method: string, params?: any): Promise<any>;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback?: (...args: any[]) => void): void;
    disconnect(): void;
    connect(): Promise<void>;
  }
  export type TypeResClient = ResClient;
}
