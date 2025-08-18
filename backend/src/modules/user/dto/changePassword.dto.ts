import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: "123123", description: "Текущий пароль" })
  @IsString()
  currentPassword!: string;

  @ApiProperty({ example: "123123", description: "Новый пароль" })
  @IsString()
  @MinLength(6, { message: 'Новый пароль должен быть не менее 6 символов' })
  newPassword!: string;
}