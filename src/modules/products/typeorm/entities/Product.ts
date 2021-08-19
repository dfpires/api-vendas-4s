import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// vamos utilizar o padrão de projeto Decorator - @
@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid -> universally unique identifier 

    @Column()
    name: string;
    
    @Column('decimal')
    price: number;
    
    @Column('int')
    quantity: number;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

   

}

export default Product;