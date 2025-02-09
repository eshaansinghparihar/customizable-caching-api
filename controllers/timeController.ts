import { TimeService } from "../service/timeService";

export class TimeController {
  constructor() {}

  getTime() {
    const timeService = new TimeService();
    const response = timeService.getTime();
    return response;
  }
}
