import { CacheItem } from "../models/cacheItem";
import { CacheService } from "../service/cacheService";

export class CacheController{
    private static instance: CacheController;
    private cache : Map<string, CacheItem>;
    private maxSize : number;
    private readonly cacheService : CacheService;
    
    constructor(service? : CacheService){
        this.cache = new Map<string, CacheItem>();
        this.maxSize = Number(process.env.MAX_CACHE_SIZE) || 10;
        this.cacheService = new CacheService();
        this.cacheService = service || new CacheService();
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

      private isCacheFull() : boolean{
        if(this.cache.size < this.maxSize){
            return false;
        }
        return true;
      }

      public async set(key : string, value : any){
        const response =  await this.cacheService.setCache(key, value, this.cache ,this.isCacheFull());
        return response;
      }

      public async get(key : string){
        const response = await this.cacheService.getCache(key, this.cache);
        return response;
      }

      public async delete(key : string){
        const response = await this.cacheService.deleteCache(key, this.cache);
        return response;
      }
}