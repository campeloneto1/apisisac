import { Cidade } from 'src/cidades/cidade.entity';
import { DiariaStatus } from 'src/diarias-status/diaria-status.entity';
import { DiariaTipo } from 'src/diarias-tipos/diaria-tipo.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('policiais_diarias')
export class PolicialDiaria {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  subunidade!: Subunidade;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  policial!: Policial;

  @Column({
    nullable: false,
    type: 'date',
  })
  data_inicial!: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  data_final!: Date;

  @ManyToOne(() => Cidade, (cidade) => cidade.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  cidade!: Cidade;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  quant_diarias!: number;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valor!: number;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  acrescimo!: number;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  ajuda_custo!: number;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valor_total!: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  observacoes!: string;

  @Column({
    nullable: true,
    length: 100,
  })
  nup!: string;

  @Column({
    nullable: true,
    length: 100,
  })
  doe!: string;

  @ManyToOne(() => DiariaStatus, (diariastatus) => diariastatus.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  diaria_status!: DiariaStatus;

  @ManyToOne(() => DiariaTipo, (diariatipo) => diariatipo.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  diaria_tipo!: DiariaTipo;

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
