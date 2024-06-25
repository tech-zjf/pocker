import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { WHITE_LIST } from './constants';
import { PlayerService } from '../player/player.service';
import dayjs from 'dayjs';

@Injectable()
export class AuthService {
    constructor(readonly playerService: PlayerService) {}

    async signIn(createAuthDto: CreateAuthDto) {
        try {
            const { phone, password } = createAuthDto;
            if (!WHITE_LIST.has(phone)) {
                return '找不到该用户！';
            }
            const player = WHITE_LIST.get(phone);
            if (password !== player.password) {
                return '密码错误';
            }
            const createPlayer = {
                nickname: player.name,
                phone: phone.toString(),
                description: 'xxx',
                wechatAvatarUrl: player.wechatAvatarUrl,
                createTime: dayjs().format(),
                updateTime: dayjs().format(),
                deleteTime: null,
            };
            await this.playerService.create(createPlayer);
            console.log('createAuthDto', createAuthDto);
            return createPlayer;
        } catch (error) {}
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
