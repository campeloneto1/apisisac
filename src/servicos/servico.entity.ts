import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Empresa } from 'src/empresas/empresa.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { ContratoTipo } from 'src/contratos-tipos/contrato-tipo.entity';
import { ContratoObjeto } from 'src/contratos-objetos/contrato-objeto.entity';
import { Policial } from 'src/policiais/policial.entity';
import { ContratoLancamento } from 'src/contratos-lancamentos/contrato-lancamento.entity';
import { ServicoTipo } from 'src/servicos-tipos/servico-tipo.entity';

@Entity('servicos')
export class Servico {

    @PrimaryGeneratedColumn()
    id!: number;

      @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      subunidade!: Subunidade;

      @ManyToOne(() => Empresa, (empresa) => empresa.id, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      empresa!: Empresa;

      @ManyToOne(() => ServicoTipo, (contratotipo) => contratotipo.id, {
        eager: true,
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
     servico_tipo!: ServicoTipo;

      @Column({
        nullable: false,
        type: 'date'
      })
      data_inicial!: Date;

      @Column({
        nullable: true,
        type: 'date'
      })
      data_final!: Date;

      @Column({
        nullable: true,
        type: 'text'
      })
      observacoes!: string;


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