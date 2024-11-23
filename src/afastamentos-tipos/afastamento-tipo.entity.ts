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

@Entity('afastamentos_tipos')
export class AfastamentoTipo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
  })
  nome!: string;

  @Column({
    nullable: true,
  })
  atestado!: boolean;

  @Column({
    nullable: true,
  })
  maternidade!: boolean;

  @Column({
    nullable: true,
  })
  paternidade!: boolean;

  @Column({
    nullable: true,
  })
  luto!: boolean;

  @Column({
    nullable: true,
  })
  lts!: boolean;

  @Column({
    nullable: true,
  })
  ltsd!: boolean;

  @Column({
    nullable: true,
  })
  ltip!: boolean;

  @Column({
    nullable: true,
  })
  dias!: number;

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
