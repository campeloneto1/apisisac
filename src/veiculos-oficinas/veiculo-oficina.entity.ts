import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';
import { Oficina } from 'src/oficinas/oficina.entity';
import { ManutencaoTipo } from 'src/manutencoes-tipos/manutencao-tipo.entity';

@Entity('veiculos-oficinas')
export class VeiculoOficina {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => Veiculo, (veiculo) => veiculo.id, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    veiculo!: Veiculo;

    @ManyToOne(() => Oficina, (oficina) => oficina.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    oficina!: Oficina;


    @ManyToOne(() => ManutencaoTipo, (manutencaotipo) => manutencaotipo.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    manutencao_tipo!: ManutencaoTipo;

    @Column({
        nullable: false,
    })
    data_inicial!: Date;

    @Column({
        nullable: true,
    })
    data_final!: Date;

    @Column({
        nullable: false,
    })
    km_inicial!: number;

    @Column({
        nullable: true,
    })
    km_final!: number;

    @Column({
        nullable: true,
        type: 'text'
      })
      observacoes!: string;

    @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    subunidade!: Subunidade;

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