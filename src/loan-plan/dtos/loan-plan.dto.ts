export class LoanPlanDto {
  id?: string;
  color: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  qty: number;
  stackable: boolean;
  tiltable: boolean;
  deleted?: boolean;
}
