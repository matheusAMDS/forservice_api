import { MigrationInterface, QueryRunner } from "typeorm"

import Category from '../../app/models/Category'

export class CategorySeed1601611467076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.manager.insert(Category, [
      { name: 'Design e Multimídia' },
      { name: 'Programação e TI' },
      { name: 'Marketing e Vendas' },
      { name: 'Tradução e Conteúdos' },
      { name: 'Finanças e Administração' }
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.manager.clear(Category)
  }
}
