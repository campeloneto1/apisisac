import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Modelo } from 'src/modelos/modelo.entity';
import { ArmamentoTipo } from 'src/armamentos-tipos/armamento-tipo.entity';
import { ArmamentoCalibre } from 'src/armamentos-calibres/armamento-calibre.entity';
import { ArmamentoTamanho } from 'src/armamentos-tamanhos/armamento-tamanho.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';

@Entity('armamentos')
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
      })
      subunidade!: Subunidade;

    @ManyToOne(() => Modelo, (modelo) => modelo.id, {
      eager: true,
    })
    modelo!: Modelo;

    @ManyToOne(() => ArmamentoTipo, (armamentotipo) => armamentotipo.id, {
        eager: true,
      })
      armamento_tipo!: ArmamentoTipo;

      @ManyToOne(() => ArmamentoCalibre, (armamentocalibre) => armamentocalibre.id, {
        eager: true,
      })
      armamento_calibre!: ArmamentoCalibre;

      @ManyToOne(() => ArmamentoTamanho, (armamentotamanho) => armamentotamanho.id, {
        eager: true,
      })
      armamento_tamanho!: ArmamentoTamanho;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}