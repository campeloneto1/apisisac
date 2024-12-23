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
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Cidade } from 'src/cidades/cidade.entity';
import { VeiculoPolicialAlteracao } from 'src/veiculos-policiais-alteracoes/veiculo-policial-alteracao.entity';

@Entity('veiculos_policiais')
export class VeiculoPolicial {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.id, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  veiculo!: Veiculo;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  policial!: Policial;

  @Column({
    nullable: false,
  })
  data_inicial!: Date;

  @Column({
    nullable: true,
  })
  data_final!: Date;

  @Column({
    nullable: false,
  })
  km_inicial!: number;

  @Column({
    nullable: true,
  })
  km_final!: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  observacoes!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  observacoes_devolucao!: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  cidade!: Cidade;

  @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  subunidade!: Subunidade;

  @OneToMany(
    (type) => VeiculoPolicialAlteracao,
    (veiculospoliciais) => veiculospoliciais.veiculo_policial,
  )
  veiculos_policiais_alteracoes: VeiculoPolicialAlteracao[];

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
