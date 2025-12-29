export class DemoService {
    greet(name: string): string {
        return `Hello, ${name}!`;
    }

    getStatus(): string {
        return 'Demo service is running';
    }
}
