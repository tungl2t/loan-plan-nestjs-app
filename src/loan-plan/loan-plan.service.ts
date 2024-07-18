import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoanPlan } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { LoanPlanDto } from './dtos/loan-plan.dto';
import { GeneralHelper } from '../common/helpers/general.helper';

@Injectable()
export class LoanPlanService {
  constructor(private prisma: PrismaService) {}

  async bulkAction(loanPlans: LoanPlanDto[]): Promise<LoanPlan[]> {
    const transactions = [];

    /*
    - We cannot use upsert function in these cases because if id is undefined or empty string, prisma will throw an exception.
    - The id must be an ObjectId
      ```
        this.prisma.loanPlan.upsert({
          where: { id: id },
          create: createData,
          update: updateData,
        });
      ```
    -Instead of it, we have to split 2 different cases:
      -> for updating loan plans
      -> for creating new loan plans
    */
    const updateData = [];
    const createData = [];

    // Validate data
    loanPlans.forEach((loanPlan, index) => {
      if (loanPlan.id) {
        updateData.push(loanPlan);
      } else {
        if (GeneralHelper.isEmptyObject(loanPlan)) {
          throw new BadRequestException(
            `loanPlans.${index} must not be empty object`,
          );
        }
        if (!loanPlan?.name?.trim()) {
          throw new BadRequestException(
            `loanPlans.${index}.The name field must be required`,
          );
        }

        if (!loanPlan?.color?.trim()) {
          throw new BadRequestException(
            `loanPlans.${index}.The color field must be required`,
          );
        }
        createData.push({ ...loanPlan, deleted: false });
      }
    });

    // Handle updating data in Mongo
    if (updateData.length) {
      transactions.push(
        ...updateData.map((loanPlan) => {
          const { id, ...updatedData } = loanPlan;
          return this.prisma.loanPlan.update({
            where: { id },
            data: {
              ...updatedData,
              updatedAt: new Date(),
              deleted: loanPlan?.deleted ?? false, // If this value is true, it means it is a soft delete
            },
          });
        }),
      );
    }

    // Handle creating data in Mongo
    if (createData.length) {
      transactions.push(this.prisma.loanPlan.createMany({ data: createData }));
    }

    try {
      // If something goes wrong, use a transaction to roll back the previous actions.
      const data = await this.prisma.$transaction(transactions);
      return data.filter((p) => !p.deleted);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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
