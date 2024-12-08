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
import { PolicialDiaria } from 'src/policiais-diarias/policial-diaria.entity';

@Entity('diarias_tipos')
export class DiariaTipo {
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
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valor!: number;

  @Column({
    nullable: true,
  })
  ajuda_custo!: boolean;

  @OneToMany((type) => PolicialDiaria, (diaria) => diaria.diaria_tipo)
  diarias: PolicialDiaria[];

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
