import { CacheService } from "../service/cacheService";

export class CacheController{
    private static instance: CacheController;
    private readonly cacheService : CacheService;
    
    constructor(){
        this.cacheService = new CacheService();
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

      public async set(key : string, value : any){
        const response =  await this.cacheService.setCache(key, value);
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