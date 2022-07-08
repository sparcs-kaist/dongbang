import {Map, Resolver} from "./types";

export class AsyncKeyValueStorage<T> {
    private readonly _storage: Map<T>;
    private readonly _pending: Map<Resolver<T>[]>;
    
    constructor() {
        this._storage = {};
        this._pending = {};
    }
    
    getAsync(key: string): Promise<T> {
        return new Promise<T>(resolve => {
            if (key in this._storage) {
                return resolve(this._storage[key]);
            }
            
            this._pending[key]
                ? this._pending[key].push(resolve)
                : (this._pending[key] = [resolve]);
        });
    }
    
    get(key: string): T {
        console.log(this._storage);
        
        if (!(key in this._storage)) {
            throw new Error(`Invalid Key "${key}"`);
        }
        
        return this._storage[key];
    }
    
    set(key: string, value: T): void {
        if (key in this._storage) {
            throw new Error(`Duplicate Key "${key}"`);
        }
        
        this._storage[key] = value;
        this._pending[key]?.forEach(resolve => resolve(value));
        delete this._pending[key];
    }
}
