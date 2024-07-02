import { Player } from '@/database/entityes/player.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsPhoneNumber, IsString, MaxLength, IsOptional, IsDateString } from 'class-validator';

export class CreatePlayerDto extends PartialType(Player) {
    @IsString()
    @MaxLength(20)
    nickname: string;

    @IsString()
    phone: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    description: string;

    @IsString()
    @MaxLength(500)
    wechatAvatarUrl: string;

    @IsDateString()
    @IsOptional()
    createTime: string;

    @IsDateString()
    @IsOptional()
    updateTime: string;

    @IsDateString()
    @IsOptional()
    deleteTime?: string | null;
}
