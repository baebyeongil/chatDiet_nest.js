import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly userId: number;
  readonly title: string;
  readonly content: string;
}
