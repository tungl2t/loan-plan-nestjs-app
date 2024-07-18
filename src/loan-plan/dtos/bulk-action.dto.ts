import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { LoanPlanDto } from './loan-plan.dto';

export class BulkActionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, {
    message: 'The loanPlans field must be an array and have at least one item',
  })
  @Type(() => LoanPlanDto)
  loanPlans: LoanPlanDto[];
}
