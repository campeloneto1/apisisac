import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Estado } from 'src/estados/estado.entity';

@Entity('cidades')
export class Cidade {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
    })
    nome!: string;
  
    @Column({
      nullable: true,
      length: 5
    })
    abreviatura!: string;

    @ManyToOne(() => Estado, (estado) => estado.id, {
      eager: true,
  })
  estado!: Estado;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}