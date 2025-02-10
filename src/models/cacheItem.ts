export interface CacheItem {
    key: string;
    value: any;
    timestamp?: number;
}

export interface ICacheResponse extends Partial<CacheItem>{
    message? : string;
}