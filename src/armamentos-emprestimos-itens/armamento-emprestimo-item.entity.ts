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
import { Armamento } from 'src/armamentos/armamento.entity';
import { ArmamentoEmprestimo } from 'src/armamentos-emprestimos/armamento-emprestimo.entity';

@Entity('armamentos_emprestimos_itens')
export class ArmamentoEmprestimoItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  quantidade!: number;

  @Column({
    nullable: false,
  })
  quantidade_devolucao!: number;

  @ManyToOne(() => Armamento, (armamento) => armamento.id, {
    eager: true,
  })
  armamento!: Armamento;

  @ManyToOne(
    () => ArmamentoEmprestimo,
    (armamento_emprestimo) => armamento_emprestimo.id,
    {
      eager: true,
    },
  )
  armamento_emprestimo!: ArmamentoEmprestimo;

  @ManyToOne(() => User, (user) => user.id)
  created_by!: User;

  @ManyToOne(() => User, (user) => user.id)
  updated_by!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
