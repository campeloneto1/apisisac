import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';

@Entity('policiais_requeridas')
export class PolicialRequerida {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Policial, (policial) => policial.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  policial!: Policial;

  @Column({
    nullable: false,
    length: 50,
  })
  nup!: string;

  @Column({
    nullable: true,
    length: 40,
  })
  boletim_entrada!: string;

  @Column({
    nullable: true,
    length: 40,
  })
  boletim_publicacao!: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  data!: Date;

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
