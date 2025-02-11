import { CacheService } from "../service/cacheService";
import { Redis } from "ioredis";

export class CacheController{
    private static instance: CacheController;
    private maxSize : number;
    private readonly redisUrl : string = process.env.REDIS_URL || 'localhost:6379';
    private readonly redisClient : Redis;
    private readonly cacheService : CacheService;
    
    constructor(){
        this.maxSize = Number(process.env.MAX_CACHE_SIZE) || 10;
        this.redisClient = new Redis(this.redisUrl);
        this.cacheService = new CacheService(this.redisClient);
    }

    static getInstance() {
        if (!CacheController.instance) {
            console.info("Creating a new instance of CacheController");
            CacheController.instance = new CacheController();
          } else {
            console.info("Using existing instance of CacheController");
        }
        return CacheController.instance;
      }

      private async isCacheFull() : Promise<boolean>{
        const size = await this.redisClient.dbsize();
        if(size < this.maxSize){
            return false;
        }
        return true;
      }

      public async set(key : string, value : any){
        const isCacheFull = await this.isCacheFull();
        const response =  await this.cacheService.setCache(key, value ,isCacheFull);
        return response;
      }

      public async get(key : string){
        const response = await this.cacheService.getCache(key);
        return response;
      }

      public async delete(key : string){
        const response = await this.cacheService.deleteCache(key);
        return response;
      }
}