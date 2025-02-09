import { NextFunction, Router, Request } from "express";
import { TimeController } from "../controllers/timeController";

const timeRouter : Router= Router();
const timeController = new TimeController();

timeRouter.get("/", async (_req : Request, res : any, next : NextFunction) => {
  try {
    const response = await timeController.getTime();
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

export default timeRouter;
