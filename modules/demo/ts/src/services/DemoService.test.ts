import { describe, it, expect } from 'vitest';
import { DemoService } from './DemoService';

describe('DemoService', () => {
    it('should be a singleton', () => {
        const instance1 = DemoService.getInstance();
        const instance2 = DemoService.getInstance();
        expect(instance1).toBe(instance2);
    });

    it('should greet correctly', () => {
        const service = DemoService.getInstance();
        expect(service.greet('World')).toBe('Hello, World!');
    });

    it('should manage status', () => {
        const service = DemoService.getInstance();
        const initialStatus = service.getStatus();
        expect(initialStatus).toBe('Demo service is running');

        service.setStatus('New Status');
        expect(service.getStatus()).toBe('New Status');
    });
});
