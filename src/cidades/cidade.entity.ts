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
import { Estado } from 'src/estados/estado.entity';
import { Unidade } from 'src/unidades/unidade.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Policial } from 'src/policiais/policial.entity';

@Entity('cidades')
export class Cidade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
  })
  nome!: string;

  @Column({
    nullable: true,
    length: 5,
  })
  abreviatura!: string;

  @ManyToOne(() => Estado, (estado) => estado.id, {
    eager: true,
    onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
  })
  estado!: Estado;

  @OneToMany((type) => Unidade, (unidade) => unidade.cidade)
  unidades: Unidade[];

  @OneToMany((type) => Subunidade, (subunidade) => subunidade.cidade)
  subunidades: Subunidade[];

  @OneToMany((type) => Policial, (policial) => policial.cidade)
  policiais: Policial[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
  })
  created_by!: User;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
  })
  updated_by!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
