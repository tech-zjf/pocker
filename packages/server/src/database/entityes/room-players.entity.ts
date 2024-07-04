import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room-players')
export class RoomPlayersEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('int', { name: 'uid', comment: '用户id', unsigned: true, default: () => 0, nullable: false })
    uid: number;

    @Column('varchar', { name: 'room_no', comment: '房间号' })
    roomNo: string;

    @Column('tinyint', {
        name: 'player_status',
        comment: '玩家类型',
        unsigned: true,
    })
    playerStatus: number;

    @CreateDateColumn({
        name: 'join_time',
        type: 'datetime',
        comment: '加入房间时间',
    })
    joinTime: string;

    @DeleteDateColumn({
        name: 'leave_time',
        comment: '离开房间时间',
        type: 'datetime',
        nullable: true,
    })
    leaveTime: string | null;
}
