export class CacheError extends Error {
    status: number;
    constructor(message: string, public statusCode : number = 403) {
      super(message);
      this.name = "cacheError";
      this.status = statusCode
    }
  }