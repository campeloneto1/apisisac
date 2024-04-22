import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Marca } from 'src/marcas/marca.entity';

@Entity('modelos')
export class Modelo {

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

    @ManyToOne(() => Marca, (marca) => marca.id, {
      eager: true,
  })
    marca!: Marca;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}