export const promiseWithResolversPolyfill = () => {
    if (typeof Promise.withResolvers === 'undefined') {
        const polyfill = function <T>() {
            let resolve!: (value: T | PromiseLike<T>) => void;
            let reject!: (reason?: any) => void;
            const promise = new Promise<T>((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return { promise, resolve, reject };
        };

        if (typeof window !== 'undefined') {
            window.Promise.withResolvers = polyfill;
        } else if (typeof global !== 'undefined') {
            global.Promise.withResolvers = polyfill;
        }
    }
};
