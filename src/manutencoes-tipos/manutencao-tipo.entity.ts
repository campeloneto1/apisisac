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
import { VeiculoOficina } from 'src/veiculos-oficinas/veiculo-oficina.entity';

@Entity('manutencoes_tipos')
export class ManutencaoTipo {
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
  revisao!: boolean;

  @Column({
    nullable: true,
  })
  troca_oleo!: boolean;

  @OneToMany(
    (type) => VeiculoOficina,
    (veiculosoficinal) => veiculosoficinal.manutencao_tipo,
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
