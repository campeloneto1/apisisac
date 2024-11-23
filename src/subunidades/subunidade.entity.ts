import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Cidade } from 'src/cidades/cidade.entity';
import { Unidade } from 'src/unidades/unidade.entity';
import { Setor } from 'src/setores/setor.entity';
import { Armamento } from 'src/armamentos/armamento.entity';
import { ArmamentoEmprestimo } from 'src/armamentos-emprestimos/armamento-emprestimo.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Oficina } from 'src/oficinas/oficina.entity';

@Entity('subunidades')
@Index(['nome', 'unidade'], { unique: true })
export class Subunidade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
  })
  nome!: string;

  @Column({
    nullable: false,
    length: 20,
  })
  abreviatura!: string;

  @Column({
    nullable: true,
    length: 11,
  })
  telefone!: string;

  @Column({
    nullable: true,
    length: 100,
    unique: true,
  })
  email!: string;

  @Column({
    nullable: true,
    length: 100,
  })
  rua!: string;

  @Column({
    nullable: true,
    length: 20,
  })
  numero!: string;

  @Column({
    nullable: true,
    length: 100,
  })
  bairro!: string;

  @Column({
    nullable: true,
    length: 8,
  })
  cep!: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  cidade!: Cidade;

  @ManyToOne(() => Unidade, (unidade) => unidade.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  unidade!: Unidade;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  comandante!: Policial;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  subcomandante!: Policial;

  @OneToMany((type) => Setor, (setor) => setor.subunidade)
  setores: Setor[];

  @OneToMany((type) => Armamento, (armamento) => armamento.subunidade)
  armamentos: Armamento[];

  @OneToMany(
    (type) => ArmamentoEmprestimo,
    (armamentoemprestimo) => armamentoemprestimo.subunidade,
  )
  armamentos_emprestimos: ArmamentoEmprestimo[];

  @OneToMany((type) => User, (user) => user.subunidade)
  users: User[];

  // @OneToMany(type => Oficina, oficina => oficina.subunidade)
  // oficinas: Oficina[];

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
