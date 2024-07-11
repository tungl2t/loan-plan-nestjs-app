import { Injectable } from '@nestjs/common';
import { LoanPlan, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LoanPlanService {
  constructor(private prisma: PrismaService) {}

  async bulkAction(
    loanPlans: Prisma.LoanPlanCreateInput[],
  ): Promise<LoanPlan[]> {
    const transactions = [];
    for (const loanPlan of loanPlans) {
      const { id, ...updatedData } = loanPlan;
      if (id) {
        // update loan plan
        transactions.push(
          this.prisma.loanPlan.update({
            where: { id },
            data: {
              ...updatedData,
              updatedAt: new Date(),
              deleted: loanPlan?.deleted ?? false, // If this value is true, it means it is a soft delete
            },
          }),
        );
      } else {
        // create new loan plan
        transactions.push(
          this.prisma.loanPlan.create({
            data: updatedData,
          }),
        );
      }
    }

    // If something goes wrong, use a transaction to roll back the previous actions.
    const data = await this.prisma.$transaction(transactions);
    return data.filter((p) => !p.deleted);
  }

  async getLoanPlans(includeDeleted: boolean = false): Promise<LoanPlan[]> {
    return this.prisma.loanPlan.findMany({
      where: includeDeleted ? {} : { deleted: false },
    });
  }

  async softDelete(id: string): Promise<LoanPlan> {
    return this.prisma.loanPlan.update({
      where: { id },
      data: { deleted: true },
    });
  }

  async deleteLoanPlans(ids: string[]): Promise<void> {
    for (const id of ids) {
      await this.prisma.loanPlan.delete({ where: { id } });
    }
  }
}
