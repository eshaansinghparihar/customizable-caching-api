import { NextFunction, Request, Response, Router } from "express";
import { HealthController } from "../controllers/healthController";

const healthRouter : Router = Router();
const healthController = new HealthController();

healthRouter.get("/", async (_req : Request, res : any, next : NextFunction) => {
  try {
    const response = await healthController.getServiceHealth();
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

export default healthRouter;
