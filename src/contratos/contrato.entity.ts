import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Empresa } from 'src/empresas/empresa.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { ContratoTipo } from 'src/contratos-tipos/contrato-tipo.entity';
import { ContratoObjeto } from 'src/contratos-objetos/contrato-objeto.entity';
import { Policial } from 'src/policiais/policial.entity';

@Entity('contratos')
export class Contrato {

    @PrimaryGeneratedColumn()
    id!: number;

      @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
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

      @ManyToOne(() => ContratoTipo, (contratotipo) => contratotipo.id, {
        eager: true,
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
      contrato_tipo!: ContratoTipo;

      @ManyToOne(() => ContratoObjeto, (contratoobjeto) => contratoobjeto.id, {
        eager: true,
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
      contrato_objeto!: ContratoObjeto;

      @ManyToOne(() => Policial, (gestor) => gestor.id, {
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
      gestor!: Policial;

      @ManyToOne(() => Policial, (fiscal) => fiscal.id, {
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
      })
      fiscal!: Policial;
      
      @Column({
        nullable: false,
        length: 50,
        unique: true
      })
      numero_contrato!: string;

      @Column({
        nullable: false,
        length: 50,
        unique: true
      })
      numero_sacc!: string;

      @Column({
        nullable: false,
        type: 'decimal', 
        precision: 10, 
        scale: 2 
      })
      valor_global!: number;

      @Column({
        nullable: false,
        type: 'date'
      })
      prazo_vigencia!: Date;

      @Column({
        nullable: true,
      })
      prorrogavel!: boolean;

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