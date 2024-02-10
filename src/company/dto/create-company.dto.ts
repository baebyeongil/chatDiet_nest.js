import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  readonly userId: Number;
  readonly title: string;
  readonly content: string;
}
