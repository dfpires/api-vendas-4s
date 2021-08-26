import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1629160727456 implements MigrationInterface {

    // este método será executado quando for criar uma tabela
    // o retorno do método é uma Promise (promessa de um retorno)
    public async up(queryRunner: QueryRunner): Promise<void> {
        // vamos criar tabela no banco de dados
        // envia o pedido e não faço nada enquanto não obtiver resposta

        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    scale: 2
                },
                {
                    name: 'quantity',
                    type: 'int'
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                }
            ]
        })) 

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // remove a tabela
        // chamamos um método síncrono
        await queryRunner.dropTable('products')
    }

}
