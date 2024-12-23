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
import { Armamento } from 'src/armamentos/armamento.entity';

@Entity('armamentos_tamanhos')
export class ArmamentoTamanho {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    length: 20,
  })
  nome!: string;

  @OneToMany((type) => Armamento, (armamento) => armamento.armamento_tamanho)
  armamentos: Armamento[];

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
