import { Module } from '@nestjs/common';

import { LoanPlanService } from './loan-plan.service';
import { LoanPlanController } from './loan-plan.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [LoanPlanService, PrismaService],
  controllers: [LoanPlanController],
})
export class LoanPlanModule {}
