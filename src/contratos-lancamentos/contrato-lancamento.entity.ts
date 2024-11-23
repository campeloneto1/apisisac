import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Contrato } from 'src/contratos/contrato.entity';

@Entity('contratos_lancamentos')
export class ContratoLancamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Contrato, (contrato) => contrato.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contrato!: Contrato;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valor!: number;

  @Column({
    nullable: false,
    type: 'date',
  })
  mes_referencia!: Date;

  @Column({
    nullable: true,
    type: 'text',
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
