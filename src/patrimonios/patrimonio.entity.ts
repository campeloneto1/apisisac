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
import { PatrimonioTipo } from 'src/patrimonios-tipos/patrimonio-tipo.entity';
import { Setor } from 'src/setores/setor.entity';

@Entity('patrimonios')
export class Patrimonio {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Setor, (setor) => setor.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  setor!: Setor;

  @ManyToOne(() => PatrimonioTipo, (patrimoniotipo) => patrimoniotipo.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  patrimonio_tipo!: PatrimonioTipo;

  @Column({
    nullable: true,
    length: 100,
  })
  nome!: string;

  @Column({
    nullable: true,
    length: 50,
  })
  serial!: string;

  @Column({
    nullable: false,
    length: 50,
    unique: true,
  })
  tombo!: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  data_baixa!: Date;

  @Column({
    nullable: true,
    length: 10000,
  })
  observacoes!: string;

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
