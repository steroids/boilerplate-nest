import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class LoginInputDto {
    @ApiProperty({description: 'Логин'})
    @IsString()
    @IsNotEmpty()
    readonly login: string;

    @ApiProperty({description: 'Пароль'})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
