export interface CacheItem {
    key: string;
    value: any;
    timestamp?: number;
}

export interface ICacheResponse {
    key : string;
    value : any;
    timestamp? : number;
    message? : string;
}