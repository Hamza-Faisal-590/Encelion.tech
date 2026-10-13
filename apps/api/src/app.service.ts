import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthStatus() {
    return {
      status: 'ok',
      service: 'encelion-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
