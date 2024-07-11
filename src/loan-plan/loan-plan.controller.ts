import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoanPlan } from '@prisma/client';

import { LoanPlanService } from './loan-plan.service';
import { LoanPlanDto } from './dtos/loan-plan.dto';

@Controller('loan-plan')
export class LoanPlanController {
  constructor(private readonly loanPlanService: LoanPlanService) {}

  @Get()
  async getLoanPlans(): Promise<LoanPlan[]> {
    return this.loanPlanService.getLoanPlans();
  }

  @Post('bulk-action')
  async bulkAction(@Body() loanPlans: LoanPlanDto[]): Promise<LoanPlan[]> {
    return this.loanPlanService.bulkAction(loanPlans);
  }
}
