import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AddServiceForeignKey1601582229337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('services', new TableColumn({
      name: 'user_id',
      type: 'uuid'
    }))
    await queryRunner.addColumn('services', new TableColumn({
      name: 'category_id',
      type: 'int'
    }))

    await queryRunner.createForeignKey('services', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users'
    }))
    await queryRunner.createForeignKey('services', new TableForeignKey({
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('services')
    const userFK = table?.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1)
    const categoryFK = table?.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1)

    await queryRunner.dropForeignKey('services', userFK as TableForeignKey)
    await queryRunner.dropForeignKey('services', categoryFK as TableForeignKey)
    await queryRunner.dropColumn('services', 'user_id')
    await queryRunner.dropColumn('services', 'category_id')
  }
}
