import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRooms1719989069607 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rooms',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        unsigned: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        comment: '房间名称',
                        length: '20',
                    },
                    {
                        name: 'room_no',
                        type: 'varchar',
                        comment: '房间号',
                        length: '20',
                    },
                    {
                        name: 'max_players',
                        type: 'int',
                        unsigned: true,
                        comment: '玩家上线人数',
                    },

                    {
                        name: 'player_num',
                        type: 'int',
                        unsigned: true,
                        comment: '当前房间人数',
                    },
                    {
                        name: 'ready_players',
                        type: 'int',
                        unsigned: true,
                        comment: '已准备好玩家人数',
                    },
                    {
                        name: 'room_state',
                        type: 'tinyint',
                        unsigned: true,
                        comment: '房间类型类型，枚举类，1、等待加入 2、游戏中 ',
                    },
                    {
                        name: 'create_time',
                        type: 'datetime',
                        comment: '创建时间',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'update_time',
                        type: 'datetime',
                        comment: '更新时间',
                        default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'delete_time',
                        type: 'datetime',
                        comment: '删除时间',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rooms');
    }
}
