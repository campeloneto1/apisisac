import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';

@Entity('postos')
export class Posto {

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
      length: 20,
      unique: true
    })
    abreviatura!: string;

    @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
      eager: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
  })
  subunidade!: Subunidade;


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