export interface CacheItem {
    key: string;
    value: any;
    timestamp?: number;
    lastAccessed? : number;
    accessCount? : number;
}

export interface ICacheResponse extends Partial<CacheItem>{
    message? : string;
}