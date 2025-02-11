import Redis from "ioredis";
import { CacheError } from "../middlewares/errors/cacheError";
import { CacheItem, ICacheResponse } from "../models/cacheItem";

export class CacheService{
    private readonly redis : Redis;
    constructor(redisClient: Redis){
        this.redis = redisClient
    }

    async setCache(key: string, value: any, isCacheFull : boolean) : Promise<ICacheResponse|undefined>{

        const serializedValue = typeof value === 'object' ? 
            JSON.stringify(value) : value.toString();

        const cacheItem: CacheItem = { key, value : serializedValue, timestamp : Date.now(), lastAccessed: Date.now(), accessCount: 1 };

        const exists = await this.redis.exists(key);

        if (exists) {
            await this.redis.hset(key, cacheItem)
            return {...cacheItem, value: value, message: 'Updated Cache Successfully'};
        }

        if(!isCacheFull){
            await this.redis.hset(key, cacheItem)
            return {...cacheItem, value: value, message : 'Set Cache Successfully'};
        }
        else{
            throw new CacheError('Cache Already Full - Cache Hit Maximum Size', 403);
        }
    }

    async getCache(key: string) : Promise<ICacheResponse|undefined> {
        const exists = await this.redis.exists(key);
        if(exists){
            const cacheItem : CacheItem = await this.redis.hgetall(key) as unknown as CacheItem;

            try {
                cacheItem.value = JSON.parse(cacheItem.value);
            } catch (e) {
                cacheItem.value = cacheItem.value.toString();
            }

            const serializedValue = typeof cacheItem.value === 'object' ? 
            JSON.stringify(cacheItem.value) : cacheItem.value.toString();

            await this.redis.hset(key, {
                ...cacheItem,
                value : serializedValue,
                lastAccessed: Date.now(),
                accessCount: Number(cacheItem.accessCount|| 0) + 1
            });
            return {...cacheItem, message : 'Get Cache Successfully'};
        }
        else{
            throw new CacheError('Cache Not Found', 404);
        }
    }

    async deleteCache(key: string) {
        const exists = await this.redis.exists(key);
        if(exists){
            await this.redis.del(key);
            return {message : 'Delete Cache Successfully'};
        }
        else{
            throw new CacheError('Cache Not Found', 404);
        }
    }
}