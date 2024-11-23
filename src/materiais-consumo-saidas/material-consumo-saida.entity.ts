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
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { ArmamentoEmprestimoItem } from 'src/armamentos-emprestimos-itens/armamento-emprestimo-item.entity';
import { MaterialConsumoSaidaItem } from 'src/materiais-consumo-saidas-itens/material-consumo-saida-item.entity';

@Entity('materiais_consumo_saidas')
export class MaterialConsumoSaida {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: true,
    type: 'datetime',
  })
  data_saida!: Date;

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

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user!: User;

  @OneToMany(
    (type) => MaterialConsumoSaidaItem,
    (materiaisconsumosaidasitens) =>
      materiaisconsumosaidasitens.material_consumo_saida,
  )
  materiais_consumo_saidas_itens: MaterialConsumoSaidaItem[];

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
