import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Cor } from 'src/cores/cor.entity';
import { Modelo } from 'src/modelos/modelo.entity';
import { VeiculoTipo } from 'src/veiculos-tipos/veiculo-tipo.entity';
import { VeiculoOficina } from 'src/veiculos-oficinas/veiculo-oficina.entity';
import { VeiculoPolicial } from 'src/veiculos-policiais/veiculo-policial.entity';

@Entity('veiculos')
export class Veiculo {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        nullable: false,
        length: 20,
    })
    placa!: string;

    @Column({
        nullable: true,
        length: 20,
    })
    placa_especial!: string;

    @Column({
        nullable: true,
        length: 20,
    })
    chassi!: string;

    @Column({
        nullable: true,
        length: 20,
    })
    renavam!: string;

    @Column({
        nullable: true,
    })
    ano!: number;

    @Column({
        nullable: true,
    })
    blindado!: boolean;

    @Column({
        nullable: true,
    })
    organico!: boolean;

    @Column({
        nullable: false,
    })
    km_inicial!: number;

    @Column({
        nullable: false,
    })
    km_atual!: number;

    @Column({
        nullable: true,
    })
    km_troca_oleo!: number;

    @Column({
        nullable: true,
        length: 2000,
      })
      observacoes!: string;

    @ManyToOne(() => Cor, (cor) => cor.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    cor!: Cor;

    @ManyToOne(() => VeiculoTipo, (veiculotipo) => veiculotipo.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    veiculo_tipo!: VeiculoTipo;

    @ManyToOne(() => Modelo, (modelo) => modelo.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    modelo!: Modelo;

    @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    subunidade!: Subunidade;

    @OneToMany(type => VeiculoOficina, veiculosoficinal => veiculosoficinal.veiculo)
    veiculos_oficinas: VeiculoOficina[];

    @OneToMany(type => VeiculoPolicial, veiculospolicial => veiculospolicial.veiculo)
    veiculos_policiais: VeiculoPolicial[];

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