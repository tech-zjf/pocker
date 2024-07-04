import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoomPlayers1720076269726 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'room_players',
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
                        name: 'uid',
                        type: 'int',
                        comment: '用户id',
                        unsigned: true,
                    },
                    {
                        name: 'room_no',
                        type: 'varchar',
                        comment: '房间号',
                        length: '20',
                    },
                    {
                        name: 'player_status',
                        comment: '玩家在当前房间的状态',
                        type: 'tinyint',
                        unsigned: true,
                    },
                    {
                        name: 'join_time',
                        type: 'datetime',
                        comment: '加入房间时间',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'leave_time',
                        type: 'datetime',
                        comment: '离开房间时间',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('room_players');
    }
}
