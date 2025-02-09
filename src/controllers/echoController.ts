import { EchoService } from "../service/echoService";

export class EchoController {
  constructor() {}

  async echoResponse(body: any) {
    const echoService = new EchoService();
    const response = await echoService.echoResponse(body);
    return response;
  }
}
