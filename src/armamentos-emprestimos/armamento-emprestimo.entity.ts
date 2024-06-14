import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { ArmamentoEmprestimoItem } from 'src/armamentos-emprestimos-itens/armamento-emprestimo-item.entity';

@Entity('armamentos_emprestimos')
export class ArmamentoEmprestimo {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      nullable: true,
      type: 'datetime'
    })
    data_emprestimo!: Date;

    @Column({
        nullable: true,
        type: 'datetime'
      })
      data_devolucao!: Date;

      @Column({
        nullable: true,
        type: 'text'
      })
      observacoes!: string;

      @Column({
        nullable: true,
      })
      cautela!: boolean;

      @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      subunidade!: Subunidade;

      @ManyToOne(() => Policial, (policial) => policial.id, {
        
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      policial!: Policial;

      @OneToMany(type => ArmamentoEmprestimoItem, armamentoemprestimoitens => armamentoemprestimoitens.armamento_emprestimo)
    armamentos_emprestimos_itens: ArmamentoEmprestimoItem[];

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