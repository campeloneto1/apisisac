import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Modelo } from 'src/modelos/modelo.entity';
import { ArmamentoTipo } from 'src/armamentos-tipos/armamento-tipo.entity';
import { ArmamentoCalibre } from 'src/armamentos-calibres/armamento-calibre.entity';
import { ArmamentoTamanho } from 'src/armamentos-tamanhos/armamento-tamanho.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { ArmamentoEmprestimoItem } from 'src/armamentos-emprestimos-itens/armamento-emprestimo-item.entity';

@Entity('armamentos')
@Index(['serial', 'subunidade'], { unique: true }) 
export class Armamento {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
    })
    serial!: string;

    @Column({
        nullable: false,
      })
      quantidade!: number;

      @Column({
        nullable: false,
      })
      quantidade_disponivel!: number;
  
    @Column({
      nullable: true,
      type: 'date'
    })
    data_validade!: Date;

    @Column({
        nullable: true,
        type: 'date'
      })
      data_baixa!: Date;

      @Column({
        nullable: true,
        length: 2000,
      })
      observacoes!: string;

      @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      subunidade!: Subunidade;

    @ManyToOne(() => Modelo, (modelo) => modelo.id, {
      eager: true,
      onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    modelo!: Modelo;

    @ManyToOne(() => ArmamentoTipo, (armamentotipo) => armamentotipo.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      armamento_tipo!: ArmamentoTipo;

      @ManyToOne(() => ArmamentoCalibre, (armamentocalibre) => armamentocalibre.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      armamento_calibre!: ArmamentoCalibre;

      @ManyToOne(() => ArmamentoTamanho, (armamentotamanho) => armamentotamanho.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      armamento_tamanho!: ArmamentoTamanho;

      @OneToMany(type => ArmamentoEmprestimoItem, armamentoemprestimoitens => armamentoemprestimoitens.armamento)
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