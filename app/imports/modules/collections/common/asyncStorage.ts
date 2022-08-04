type Resolver<T> = (value: T | PromiseLike<T>) => void;
type Map<T> = { [key: string]: T };

export class AsyncKeyValueStorage<T> {
    private readonly _storage: Map<T>;
    private readonly _pending: Map<Resolver<T>[]>;
    
    private readonly _timeout: number;
    
    constructor (timeout?: number) {
        this._storage = {};
        this._pending = {};
        
        this._timeout = timeout || 1000;
    }
    
    getAsync (key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => reject(`Invalid Key "${key}"`), this._timeout);
            
            if (key in this._storage) {
                return resolve(this._storage[key]);
            }
            
            this._pending[key]
                ? this._pending[key].push(resolve)
                : (this._pending[key] = [resolve]);
        });
    }
    
    get (key: string): T {
        if (!(key in this._storage)) {
            throw new Error(`Invalid Key "${key}"`);
        }
        
        return this._storage[key];
    }
    
    contains (key: string): boolean {
        return key in this._storage;
    }
    
    set (key: string, value: T): void {
        if (key in this._storage) {
            throw new Error(`Duplicate Key "${key}"`);
        }
        
        this._storage[key] = value;
        this._pending[key]?.forEach(resolve => resolve(value));
        delete this._pending[key];
    }
}
