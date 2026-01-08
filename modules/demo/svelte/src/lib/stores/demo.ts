import { readable } from 'svelte/store';
import { demoService } from '@modules/demo-ts';

export const status = readable<string>(demoService.getStatus(), (set) => {
    // Subscribe to the RxJS observable
    const unsubscribe = demoService.subscribe((value) => {
        set(value);
    });

    // Svelte store cleanup calls this function
    return () => {
        unsubscribe();
    };
});
