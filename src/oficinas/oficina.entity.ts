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
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Policial } from 'src/policiais/policial.entity';
import { VeiculoOficina } from 'src/veiculos-oficinas/veiculo-oficina.entity';

@Entity('oficinas')
@Index(['cnpj', 'subunidade'], { unique: true })
export class Oficina {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
  })
  nome!: string;

  @Column({
    nullable: false,
    length: 15,
  })
  cnpj!: string;

  @Column({
    nullable: true,
    length: 11,
  })
  telefone1!: string;

  @Column({
    nullable: true,
    length: 11,
  })
  telefone2!: string;

  @Column({
    nullable: true,
    length: 100,
  })
  email!: string;

  @Column({
    nullable: true,
    length: 100,
  })
  gerente!: string;

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

  @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  subunidade!: Subunidade;

  @OneToMany(
    (type) => VeiculoOficina,
    (veiculosoficinal) => veiculosoficinal.oficina,
  )
  veiculos_oficinas: VeiculoOficina[];

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
