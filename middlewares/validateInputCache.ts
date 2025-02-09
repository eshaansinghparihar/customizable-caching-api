import { Request, Response, NextFunction } from "express";

export const validateCacheInput = (req: Request, res: any, next: NextFunction) => {
    const { key, value } = req.body;
    if (!key || value === undefined) {
        return res.status(400).json({ error: 'Key and value are required' });
    }
    next();
};