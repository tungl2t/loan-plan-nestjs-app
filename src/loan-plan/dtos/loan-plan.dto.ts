import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoanPlanDto {
  @IsOptional()
  @IsMongoId({ message: 'The id field must be a valid Mongo Id' })
  id?: string;

  @IsOptional()
  @IsString({ message: 'The color field must be a string' })
  @IsNotEmpty({ message: 'The color field must not be empty string' })
  @Transform(({ value }: TransformFnParams) => value.trim())
  color?: string;

  @IsOptional()
  @IsString({ message: 'The name field must be a string' })
  @IsNotEmpty({ message: 'The name field must not be empty string' })
  @Transform(({ value }: TransformFnParams) => value.trim())
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, {
    message: 'The length field must be a number and greater or equal than zero',
  })
  length?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, {
    message: 'The width field must be a number and greater or equal than zero',
  })
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, {
    message: 'The height field must be a number and greater or equal than zero',
  })
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, {
    message: 'The weight field must be a number and greater or equal than zero',
  })
  weight?: number;

  @IsOptional()
  @IsNumber({})
  @Min(0, {
    message: 'The qty field must be a number and greater or equal than zero',
  })
  qty?: number;

  @IsOptional()
  @IsBoolean({ message: 'The stackable field must be a boolean' })
  stackable?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'The tiltable field must be a boolean' })
  tiltable?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'The deleted field must be a boolean' })
  deleted?: boolean;
}
