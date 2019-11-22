import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const random = Math.sin(1);
    return `Hello World! to yo supid ${random} man`;
  }

}
