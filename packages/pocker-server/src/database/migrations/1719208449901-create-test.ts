import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTest1719208449901 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'test',
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
                        length: '255',
                        comment: '姓名',
                    },
                    {
                        name: 'status',
                        type: 'tinyint',
                        comment: '类型，0:未完成，1.进行中，2.已完成',
                        unsigned: true,
                        default: '0',
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('test');
    }
}
