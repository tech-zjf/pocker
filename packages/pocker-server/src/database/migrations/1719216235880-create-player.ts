import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlayer1719216235880 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'player',
                columns: [
                    {
                        name: 'uid',
                        type: 'char',
                        length: '8',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'nickname',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'wechatAvatarUrl',
                        type: 'varchar',
                        length: '255',
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
                        default:
                            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
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

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
