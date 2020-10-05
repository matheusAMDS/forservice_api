import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateService1601578693189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'services',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'description',
          type: 'text'
        },
        {
          name: 'value',
          type: 'float'
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services')
  }

}
