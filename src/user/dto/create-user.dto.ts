import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly loginId: string;
  readonly name: string;
  readonly password: string;
}
