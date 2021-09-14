import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// vamos utilizar o padrão de projeto Decorator - @
@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid -> universally unique identifier 

    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column()
    avatar: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

}

export default User;