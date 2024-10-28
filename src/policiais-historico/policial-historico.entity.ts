import { Policial } from 'src/policiais/policial.entity';
import { Setor } from 'src/setores/setor.entity';
import { User } from 'src/users/user.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('policiais_historicos')
export class PolicialHistorico {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  policial!: Policial;

  @ManyToOne(() => Setor, (setor) => setor.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  setor_origem!: Setor;

  @ManyToOne(() => Setor, (setor) => setor.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  setor_destino!: Setor;

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
