import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Armamento } from 'src/armamentos/armamento.entity';
import { ArmamentoEmprestimo } from 'src/armamentos-emprestimos/armamento-emprestimo.entity';

@Entity('armamentos_emprestimos_itens')
@Index(['armamento', 'armamento_emprestimo'], { unique: true }) 
export class ArmamentoEmprestimoItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  quantidade!: number;

  @Column({
    nullable: true,
  })
  quantidade_devolucao!: number;

  @ManyToOne(() => Armamento, (armamento) => armamento.id, {
    eager: true,
    onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
  })
  armamento!: Armamento;

  @ManyToOne(
    () => ArmamentoEmprestimo,
    (armamento_emprestimo) => armamento_emprestimo.id,
    {
      eager: true,
      onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
  )
  @JoinColumn()
  armamento_emprestimo!: ArmamentoEmprestimo;

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
