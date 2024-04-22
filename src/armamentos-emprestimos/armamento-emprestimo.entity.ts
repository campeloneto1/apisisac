import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';

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
        length: 2000,
      })
      observacoes!: string;

      @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
      })
      subunidade!: Subunidade;

      @ManyToOne(() => Policial, (policial) => policial.id, {
        eager: true,
      })
      policial!: Policial;

      @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}