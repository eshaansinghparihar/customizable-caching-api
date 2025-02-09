import { CacheError } from "../middlewares/errors/cacheError";
import { CacheItem, ICacheResponse } from "../models/cacheItem";

export class CacheService{
    async setCache(key: string, value: any, cache : Map<string, CacheItem>, isCacheFull : boolean) : Promise<ICacheResponse|undefined>{
        
        const timestamp = new Date().getTime();
        const cacheItem: CacheItem = { key, value, timestamp };

        if (cache.has(key)) {
            cache.set(key, cacheItem);
            return {...cacheItem, message: 'Updated Cache Successfully'};
        }

        if(!isCacheFull){
            cache.set(key, cacheItem)
            return {...cacheItem, message : 'Set Cache Successfully'};
        }
        else{
            throw new CacheError('Cache Already Full - Cache Hit Maximum Size', 403);
        }
    }

    async getCache(key: string, cache : Map<string, CacheItem>) : Promise<ICacheResponse|undefined> {
        if(cache.has(key)){
            const cacheItem = cache.get(key)
            return {...cacheItem!, message : 'Get Cache Successfully'};
        }
        else{
            throw new CacheError('Cache Not Found', 404);
        }
    }

    deleteCache(key: string, cache : Map<string, CacheItem>) {
        if(cache.has(key)){
            cache.delete(key);
            return {message : 'Delete Cache Successfully'};
        }
        else{
            throw new CacheError('Cache Not Found', 404);
        }
    }
}