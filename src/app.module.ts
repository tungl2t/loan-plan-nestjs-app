import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanPlanModule } from './loan-plan/loan-plan.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [LoanPlanModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({}),
    },
  ],
})
export class AppModule {}
