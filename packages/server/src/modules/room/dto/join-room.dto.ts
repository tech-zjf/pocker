import { IsString } from 'class-validator';

export class JoinRoomDto {
    @IsString()
    roomNo: string;

    @IsString()
    uid: string;
}
