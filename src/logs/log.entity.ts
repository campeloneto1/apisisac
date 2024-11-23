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

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    type: 'text',
  })
  object!: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  object_old!: string;

  @Column({
    nullable: false,
    length: 100,
  })
  mensagem!: string;

  @Column({
    nullable: false,
  })
  tipo!: number;

  @Column({
    nullable: false,
    length: 50,
  })
  table!: string;

  @Column({
    nullable: false,
  })
  fk!: number;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
