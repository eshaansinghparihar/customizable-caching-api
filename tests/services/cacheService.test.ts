import Redis from "ioredis";
import { CacheService } from "../../src/service/cacheService";
import cacheItemRequestBody from "../mocks/cacheCreateRequestBody";
import { createCacheResponseBody, updateCacheResponseBody } from "../mocks/cacheCreateResponseBody";
import { RedisClient } from "../../src/clients/redisClient";
import { CacheError } from "../../src/middlewares/errors/cacheError";
import cacheItemResponseBody from "../mocks/cacheGetResponseBody";

jest.mock('ioredis')

describe('CacheService', () => {
    let cacheService : CacheService;
    let redisClient : Redis;

    beforeEach(()=>{

        redisClient = new Redis();
        jest.spyOn(RedisClient.getInstance(), 'getRedisClient').mockReturnValue(redisClient);
        cacheService = new CacheService();
        
    });

    afterAll(() => {
        redisClient.disconnect();
    });

    describe('SetCache', ()=>{
        it('should be able to set cache when it does not exist', async () => {

            redisClient.exists = jest.fn().mockResolvedValue(0);
            redisClient.hset = jest.fn().mockResolvedValueOnce(1);
            redisClient.dbsize = jest.fn().mockResolvedValueOnce(0);
    
            const mockRequestBody = cacheItemRequestBody;
            const mockCreateResponseBody = createCacheResponseBody;
    
            const response = await cacheService.setCache(mockRequestBody.key, mockRequestBody.value);
    
            expect(response?.key).toBe(mockCreateResponseBody.key);
            expect(response?.value).toStrictEqual(mockCreateResponseBody.value);
            expect(response?.message).toBe(mockCreateResponseBody.message);
            expect(response?.accessCount).toBe(mockCreateResponseBody.accessCount);
            expect(Math.abs(response?.timestamp! - mockCreateResponseBody.timestamp)).toBeLessThanOrEqual(500);
            expect(Math.abs(response?.lastAccessed! - mockCreateResponseBody.lastAccessed)).toBeLessThanOrEqual(500);
            
        });

        it('should be able to update cache when it already exists',async ()=>{

            redisClient.exists = jest.fn().mockResolvedValue(1);
            redisClient.hset = jest.fn().mockResolvedValueOnce(1);
            redisClient.dbsize = jest.fn().mockResolvedValueOnce(1);
    
            const mockRequestBody = cacheItemRequestBody;
            const mockUpdateResponseBody = updateCacheResponseBody;
    
            const response = await cacheService.setCache(mockRequestBody.key, mockRequestBody.value);
    
            expect(response?.key).toBe(mockUpdateResponseBody.key);
            expect(response?.value).toStrictEqual(mockUpdateResponseBody.value);
            expect(response?.message).toBe(mockUpdateResponseBody.message);
            expect(response?.accessCount).toBe(mockUpdateResponseBody.accessCount);
            expect(Math.abs(response?.timestamp! - mockUpdateResponseBody.timestamp)).toBeLessThanOrEqual(500);
            expect(Math.abs(response?.lastAccessed! - mockUpdateResponseBody.lastAccessed)).toBeLessThanOrEqual(500);
    
        })
    
        it('should throw error if cache is full', async ()=>{
    
            redisClient.exists = jest.fn().mockResolvedValue(0);
            redisClient.hset = jest.fn().mockResolvedValueOnce(0);
            redisClient.dbsize = jest.fn().mockResolvedValueOnce(1);
    
            const mockRequestBody = cacheItemRequestBody;
    
            await expect(cacheService.setCache(mockRequestBody.key, mockRequestBody.value))
            .rejects
            .toThrow(new CacheError('Cache Already Full - Cache Hit Maximum Size', 403));
        });
    })

    describe('GetCache', () => {
        it('should be able to get the cache when it exists', async () => {

            const mockGetRequestBody = cacheItemResponseBody;
    
            redisClient.exists = jest.fn().mockResolvedValue(1);
            redisClient.hgetall = jest.fn().mockResolvedValue(mockGetRequestBody);
            redisClient.hset = jest.fn().mockResolvedValueOnce(1);
            redisClient.dbsize = jest.fn().mockResolvedValueOnce(1);
    
            const response = await cacheService.getCache(mockGetRequestBody.key);
    
            expect(response?.key).toBe(mockGetRequestBody.key);
            expect(response?.value).toStrictEqual(mockGetRequestBody.value);
            expect(response?.message).toBe(mockGetRequestBody.message);
            expect(response?.accessCount).toBe(mockGetRequestBody.accessCount);
            expect(Math.abs(response?.timestamp! - Number(mockGetRequestBody.timestamp))).toBeLessThanOrEqual(500);
            expect(Math.abs(response?.lastAccessed! - Number(mockGetRequestBody.lastAccessed))).toBeLessThanOrEqual(500);
            
        });
    
        it('should throw error if cache does not exist', async() => {
    
            const mockGetRequestBody = cacheItemResponseBody;
    
            redisClient.exists = jest.fn().mockResolvedValue(0);
    
            await expect(cacheService.getCache(mockGetRequestBody.key))
            .rejects
            .toThrow(new CacheError('Cache Not Found', 404));
        })
    })

    describe('DeleteCache', ()=>{
        it('should be able to delete cache when it exists', async () => {

            redisClient.exists = jest.fn().mockResolvedValue(1);
            redisClient.del = jest.fn().mockResolvedValue(1);

            const response = await cacheService.deleteCache('12345678');

            expect(response.message).toBe("Delete Cache Successfully");
        })

        it('should be throw error when cache does not exist', async () => {

            redisClient.exists = jest.fn().mockResolvedValue(0);

            await expect(cacheService.deleteCache('12345678'))
            .rejects
            .toThrow(new CacheError('Cache Not Found', 404));
        })
    })
})