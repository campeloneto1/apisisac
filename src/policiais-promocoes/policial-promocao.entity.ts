import { Cidade } from 'src/cidades/cidade.entity';
import { DiariaStatus } from 'src/diarias-status/diaria-status.entity';
import { DiariaTipo } from 'src/diarias-tipos/diaria-tipo.entity';
import { Graduacao } from 'src/graduacoes/graduacao.entity';
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

@Entity('policiais_promocoes')
export class PolicialPromocao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  policial!: Policial;

  @ManyToOne(() => Graduacao, (graduacao) => graduacao.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  graduacao!: Graduacao;

  @Column({
    nullable: false,
    type: 'date',
  })
  data_promocao!: Date;

  @Column({
    nullable: true,
    length: 100,
  })
  boletim!: string;

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
