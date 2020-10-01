import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1601520884705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          default: 'uuid_generate_v4()'
        },
        {
          name: 'first_name',
          type: 'varchar'
        },
        {
          name: 'last_name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true 
        },
        {
          name: 'password',
          type: 'varchar'
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
