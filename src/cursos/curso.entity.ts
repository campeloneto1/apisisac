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
import { Policial } from 'src/policiais/policial.entity';
import { PolicialCurso } from 'src/policiais-cursos/policial-curso.entity';

@Entity('crusos')
export class Curso {
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
    length: 10,
    unique: true,
  })
  abreviatura!: string;

  @OneToMany((type) => PolicialCurso, (policialcurso) => policialcurso.curso)
  policiais: PolicialCurso[];

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
