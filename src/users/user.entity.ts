import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Perfil } from '../perfis/perfil.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Policial } from 'src/policiais/policial.entity';

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

    @OneToOne(() => Policial, (policial) => policial.id, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }) // specify inverse side as a second parameter
    @JoinColumn()
    policial: Policial

    @ManyToOne(() => Perfil, (perfil) => perfil.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    perfil!: User;

    @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    subunidade!: Subunidade;

    @ManyToOne(() => User, (user) => user.id, {
      onDelete: 'SET NULL'
    })
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id, {
      onDelete: 'SET NULL'
    })
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}