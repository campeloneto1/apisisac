import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';

@Entity('graduacoes')
export class Graduacao {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
      unique: true
    })
    nome!: string;
  
    @Column({
      nullable: false,
      length: 5
    })
    abreviatura!: string;

    @OneToMany(type => Policial, policial => policial.graduacao)
    policiais: Policial[];

    @ManyToOne(() => User, (user) => user.id, {
      onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id, {
      onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}