import { HealthService } from "../service/healthService";

export class HealthController {
  constructor() {}

  async getServiceHealth() {
    const healthService = new HealthService();
    const response = await healthService.getServiceHealth();
    return response;
  }
}
