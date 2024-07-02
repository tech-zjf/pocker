import { IsString } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    phone: string;

    @IsString()
    password: string;
}
