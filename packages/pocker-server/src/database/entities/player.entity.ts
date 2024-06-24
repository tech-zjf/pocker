import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Player {
    @PrimaryGeneratedColumn({
        name: 'uid',
        comment: '用户id',
        type: 'bigint',
    })
    uid: string;

    @Column('varchar', {
        name: 'nickname',
        comment: '用户昵称',
    })
    nickname: string;

    @Column('varchar', {
        name: 'description',
        comment: '用户描述',
        length: 255,
    })
    description: string;

    @Column('varchar', {
        name: 'wechat_avatar_url',
        nullable: true,
        length: 255,
    })
    wechatAvatarUrl: string | null;

    @CreateDateColumn({
        name: 'create_time',
        type: 'datetime',
        comment: '创建时间',
    })
    createTime: Date;

    @UpdateDateColumn({
        name: 'update_time',
        type: 'datetime',
        comment: '更新时间',
    })
    updateTime: Date;

    @DeleteDateColumn({
        name: 'delete_time',
        comment: '删除时间',
        type: 'datetime',
        nullable: true,
    })
    deleteTime: Date | null;
}
