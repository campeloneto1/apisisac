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

@Entity('diarias_status')
export class DiariaStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 100,
    unique: true,
  })
  nome!: string;

  @Column({
    nullable: true,
  })
  cadastrado!: boolean;

  @Column({
    nullable: true,
  })
  em_andamento!: boolean;

  @Column({
    nullable: true,
  })
  concluido!: boolean;

  @OneToMany((type) => PolicialDiaria, (diaria) => diaria.diaria_status)
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
