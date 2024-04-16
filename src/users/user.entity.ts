import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Perfil } from '../perfis/perfil.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
    })
    nome!: string;
  
    @Column({
      length: 11,
      nullable: true,
    })
    telefone!: string;
  
    @Column({
      length: 100,
      nullable: true,
      unique: true
    })
    email!: string;
  
    @Column({
      length: 11,
      unique: true,
      nullable: false,
    })
    cpf!: string;
  
    @Column({
      length: 100,
      nullable: false,
      select: false
    })
    password!: string;
  
    @Column({
      length: 100,
      unique: true,
      nullable: false,
      select: false
    })
    salt!: string;

    @ManyToOne(() => Perfil, (perfil) => perfil.id, {
        eager: true,
    })
    perfil!: User;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}