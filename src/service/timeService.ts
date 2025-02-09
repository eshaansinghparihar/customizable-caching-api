import { Time } from "../models/time";

export class TimeService {
  constructor() {}
  getTime() {
    const time: Time = {
      time: new Date(),
    };
    return time;
  }
}
