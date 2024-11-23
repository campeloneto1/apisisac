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
import { Cidade } from 'src/cidades/cidade.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Policial } from 'src/policiais/policial.entity';

@Entity('unidades')
export class Unidade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
    unique: true,
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

  @OneToMany((type) => Subunidade, (subunidade) => subunidade.unidade)
  subunidades: Subunidade[];

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
