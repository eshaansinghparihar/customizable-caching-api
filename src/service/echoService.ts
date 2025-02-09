import { Echo } from "../models/echo";

export class EchoService {
  constructor() {}

  echoResponse(body: any) {
    const echoResponse: Echo = {
      response: body,
    };
    return echoResponse;
  }
}
