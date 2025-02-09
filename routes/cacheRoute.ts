import { NextFunction, Router, Request, Response } from "express";
import { CacheController } from "../controllers/cacheController";
import { validateCacheInput } from "../middlewares/validateInputCache";

const cacheRouter : Router = Router();

cacheRouter.post('/cache', validateCacheInput, async(req: Request, res : any, next : NextFunction) => {
    try{
        const { key, value } = req.body;
        const response = await CacheController.getInstance().set(key, value);
        return res.status(201).json(response);
    }
    catch(error)
    {
        next(error)
    }
});

cacheRouter.get('/cache/:key', async(req: Request, res : any, next : NextFunction) => {
    try{
        const { key } = req.params;
        const response = await CacheController.getInstance().get(key);
        return res.status(200).json(response);
    }
    catch(error)
    {
        next(error)
    }
});

cacheRouter.delete('/cache/:key', async(req: Request, res : any, next : NextFunction)=> {
    try{
        const { key } = req.params;
        const response = await CacheController.getInstance().delete(key);
        return res.status(204).json(response);
    }
    catch(error)
    {
        next(error)
    }
})


export default cacheRouter;