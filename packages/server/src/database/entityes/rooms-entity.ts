import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('rooms')
class RoomsEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', comment: '房间名称', length: 20 })
    name: string;

    @Column('varchar', { name: 'room_no', comment: '房间号', length: 20 })
    roomNo: string;

    @Column('int', { name: 'max_players', comment: '玩家上线人数' })
    maxPlayers: string;

    @Column('int', { name: 'player_num', comment: '当前房间人数' })
    playerNum: string;

    @Column('int', { name: 'ready_players', comment: '已准备好玩家人数' })
    readyPlayers: string;

    @Column('tinyint', {
        name: 'room_state',
        comment: '房间类型类型，枚举类，1、等待加入 2、游戏中 ',
        unsigned: true,
    })
    roomState: number;

    @CreateDateColumn({
        name: 'create_time',
        type: 'datetime',
        comment: '创建时间',
    })
    createTime: string;

    @UpdateDateColumn({
        name: 'update_time',
        type: 'datetime',
        comment: '更新时间',
    })
    updateTime: string;

    @DeleteDateColumn({
        name: 'delete_time',
        comment: '删除时间',
        type: 'datetime',
        nullable: true,
    })
    deleteTime: string | null;
}
