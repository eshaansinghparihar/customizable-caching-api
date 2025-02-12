import Redis from "ioredis";

export class RedisClient{

    private static instance: RedisClient;
    private redisClient: Redis;
    private readonly redisUrl : string = process.env.REDIS_URL || 'localhost:6379';
    private constructor(){
        this.redisClient = new Redis(this.redisUrl);
    }

    public static getInstance(): RedisClient{
        if(!RedisClient.instance){
            RedisClient.instance = new RedisClient();
        }
        return RedisClient.instance;
    }

    public getRedisClient(): Redis{
        return this.redisClient;
    }
}