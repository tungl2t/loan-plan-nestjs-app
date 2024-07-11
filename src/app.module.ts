import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanPlanModule } from './loan-plan/loan-plan.module';

@Module({
  imports: [LoanPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
