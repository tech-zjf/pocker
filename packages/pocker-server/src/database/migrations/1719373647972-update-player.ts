import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePlayer1719373647972 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'player',
            new TableColumn({
                name: 'add',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('player', 'add');
    }
}
