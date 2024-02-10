import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly title: string;
  readonly content: string;
  readonly userId: Number;
}
