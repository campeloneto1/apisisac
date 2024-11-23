import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Modelo } from 'src/modelos/modelo.entity';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
    unique: true,
  })
  nome!: string;

  @Column({
    nullable: true,
    length: 5,
  })
  abreviatura!: string;

  @Column({
    nullable: true,
  })
  armamento!: boolean;

  @Column({
    nullable: true,
  })
  logistica!: boolean;

  @Column({
    nullable: true,
  })
  transporte!: boolean;

  @OneToMany((type) => Modelo, (modelo) => modelo.marca)
  modelos: Modelo[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  created_by!: User;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  updated_by!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
