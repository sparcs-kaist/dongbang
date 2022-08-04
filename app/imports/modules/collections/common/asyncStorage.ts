type Resolver<T> = (value: T | PromiseLike<T>) => void;

export class AsyncKeyValueStorage<K, V> {
    private readonly _storage: Map<K, V>;
    private readonly _pending: Map<K, Resolver<V>[]>;
    
    private readonly _timeout: number;
    
    constructor(timeout?: number) {
        this._storage = new Map();
        this._pending = new Map();
        
        this._timeout = timeout || 1000;
    }
    
    getAsync(key: K): Promise<V> {
        return new Promise<V>((resolve, reject) => {
            setTimeout(() => reject(`Invalid Key "${key}"`), this._timeout);
            
            const value = this._storage.get(key);
            if (value) return resolve(value);
            
            if (!this._pending.has(key)) {
                this._pending.set(key, []);
            }
            
            this._pending.get(key)?.push(resolve);
        });
    }
    
    get(key: K): V | undefined {
        return this._storage.get(key);
    }
    
    contains(key: K): boolean {
        return this._storage.has(key);
    }
    
    set(key: K, value: V): void {
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
