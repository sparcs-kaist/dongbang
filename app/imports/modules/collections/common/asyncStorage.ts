type Resolver<T> = (value: T | PromiseLike<T>) => void;

export class AsyncKeyValueStorage<T> {
    private readonly _storage: Map<string, T>;
    private readonly _pending: Map<string, Resolver<T>[]>;
    
    private readonly _timeout: number;
    
    constructor (timeout?: number) {
        this._storage = new Map();
        this._pending = new Map();
        
        this._timeout = timeout || 1000;
    }
    
    getAsync (key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => reject(`Invalid Key "${key}"`), this._timeout);
            
            const value = this._storage.get(key);
            if (value) return resolve(value);
            
            if (!this._pending.has(key)) {
                this._pending.set(key, []);
            }
            
            this._pending.get(key)?.push(resolve);
        });
    }
    
    get (key: string): T {
        const value = this._storage.get(key);
        if (!value) {
            throw new Error(`Invalid Key "${key}"`);
        }
        return value;
    }
    
    contains (key: string): boolean {
        return this._storage.has(key);
    }
    
    set (key: string, value: T): void {
        if (key in this._storage) {
            throw new Error(`Duplicate Key "${key}"`);
        }
        
        this._storage.set(key, value);
        this._pending
            .get(key)
            ?.forEach(resolve => resolve(value));
        this._pending.delete(key);
    }
}
