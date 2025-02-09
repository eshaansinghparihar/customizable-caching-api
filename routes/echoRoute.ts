import { NextFunction, Router, Request } from "express";
import { EchoController } from "../controllers/echoController";

const echoRouter : Router = Router();
const echoController = new EchoController();

echoRouter.post("/", async (req : Request, res : any, next : NextFunction) => {
  try {
    const body = req.body;
    const response = await echoController.echoResponse(body);
    return res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

export default echoRouter;
