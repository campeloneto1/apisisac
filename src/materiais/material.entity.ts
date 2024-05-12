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
import { Modelo } from 'src/modelos/modelo.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { MaterialTipo } from 'src/materiais-tipos/material-tipo.entity';
import { MaterialPolicialItem } from 'src/materiais-policiais-itens/material-policial-item.entity';

@Entity('materiais')
@Index(['serial', 'subunidade'], { unique: true })
export class Material {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
    length: 100,
  })
  serial!: string;

  @Column({
    nullable: false,
  })
  quantidade!: number;

  @Column({
    nullable: false,
  })
  quantidade_disponivel!: number;

  @Column({
    nullable: true,
    type: 'date',
  })
  data_validade!: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  data_baixa!: Date;

  @Column({
    nullable: true,
    type: 'text',
  })
  observacoes!: string;

  @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  subunidade!: Subunidade;

  @ManyToOne(() => Modelo, (modelo) => modelo.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  modelo!: Modelo;

  @ManyToOne(() => MaterialTipo, (materialtipo) => materialtipo.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  material_tipo!: MaterialTipo;

  @OneToMany(type => MaterialPolicialItem, materiaispoliciaisitens => materiaispoliciaisitens.material)
    materiais_policiais_itens: MaterialPolicialItem[];

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
