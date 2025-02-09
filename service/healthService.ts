import { Health } from "../models/health";

export class HealthService {
  constructor() {}
  getServiceHealth() {
    const health: Health = {
      version: "1.0.0",
      healthy: true,
      timestamp: new Date(),
      message: "Server is up and running",
    };
    return health;
  }
}
