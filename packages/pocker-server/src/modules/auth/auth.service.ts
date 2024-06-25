import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { WHITE_LIST } from './constants';
import { PlayerService } from '../player/player.service';
import * as dayjs from 'dayjs';
import { ApiException } from '@/core/filters/api.exception';
import { ApiCode } from '@/constants/api-code';
import { FORMAT } from '@/constants/dayjs';

@Injectable()
export class AuthService {
    constructor(readonly playerService: PlayerService) {}

    async signIn(createAuthDto: CreateAuthDto) {
        const { phone, password } = createAuthDto;
        if (!WHITE_LIST.has(phone)) {
            throw new ApiException(ApiCode.USER_NOT_FOUND);
        }
        const player = WHITE_LIST.get(phone);
        if (password != player.password) {
            throw new ApiException(ApiCode.PASSWORD_ERR);
        }
        try {
            const createPlayer = {
                nickname: player.name,
                phone: phone.toString(),
                description: player.description,
                wechatAvatarUrl: player.wechatAvatarUrl,
                createTime: dayjs().format(FORMAT.DATETIME),
                updateTime: dayjs().format(FORMAT.DATETIME),
                deleteTime: null,
            };
            await this.playerService.create(createPlayer);
            return createPlayer;
        } catch (error) {
            console.log(error);
            throw new ApiException(ApiCode.USER_NOT_FOUND);
        }
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
