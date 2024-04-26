import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Cidade } from 'src/cidades/cidade.entity';
import { Sexo } from 'src/sexos/sexo.entity';
import { Graduacao } from 'src/graduacoes/graduacao.entity';
import { Setor } from 'src/setores/setor.entity';
import { PolicialPublicacao } from 'src/policiais-publicacoes/policial-publicacao.entity';
import { PolicialFerias } from 'src/policiais-ferias/policial-ferias.entity';
import { PolicialAtestado } from 'src/policiais-atestados/policial-atestado.entity';
import { ArmamentoEmprestimo } from 'src/armamentos-emprestimos/armamento-emprestimo.entity';
import { Unidade } from 'src/unidades/unidade.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';

@Entity('policiais')
export class Policial {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: true,
        length: 10,
        unique: true
    })
    numeral!: string;

    @Column({
        nullable: false,
        length: 100,
    })
    nome!: string;

    @Column({
        nullable: false,
        length: 50,
    })
    nome_guerra!: string;

    @Column({
        nullable: false,
        length: 8,
        unique: true
    })
    matricula!: string;

    @Column({
        nullable: false,
        length: 11,
        unique: true
    })
    cpf!: string;

    @Column({
        nullable: true,
        length: 100,
    })
    email!: string;

    @Column({
        nullable: true,
        length: 11,
    })
    telefone1!: string;

    @Column({
        nullable: true,
        length: 11,
    })
    telefone2!: string;

    @Column({
        nullable: true,
        type: 'date'
    })
    data_nascimento!: Date;

    @Column({
        nullable: true,
        length: 100,
    })
    rua!: string;

    @Column({
        nullable: true,
        length: 20,
    })
    numero!: string;

    @Column({
        nullable: true,
        length: 100,
    })
    bairro!: string;

    @Column({
        nullable: true,
        length: 8,
    })
    cep!: string;

    @Column({
        nullable: true,
        type: 'date'
    })
    data_inclusao!: Date;

    @Column({
        nullable: true,
        type: 'date'
    })
    data_apresentacao!: Date;

    @Column({
        nullable: true,
        length: 50,
    })
    boletim_inclusao!: string;

    @Column({
        nullable: true,
        length: 50,
    })
    boletim_apresentacao!: string;

    @Column({
        nullable: true,
        length: 50,
    })
    boletim_transferencia!: string;

    @Column({
        nullable: true,
        length: 100,
    })
    foto!: string;

    @ManyToOne(() => Cidade, (cidade) => cidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    cidade!: Cidade;

    @ManyToOne(() => Sexo, (sexo) => sexo.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    sexo!: Sexo;

    @ManyToOne(() => Graduacao, (graduacao) => graduacao.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    graduacao!: Graduacao;

    @ManyToOne(() => Setor, (setor) => setor.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    setor!: Setor;

    @OneToOne(() => User, (user) => user.policial) // specify inverse side as a second parameter
    user: User

    @OneToMany(type => PolicialPublicacao, policialpublicacao => policialpublicacao.policial)
    policiais_publicacoes: PolicialPublicacao[];

    @OneToMany(type => PolicialFerias, policialferias => policialferias.policial)
    policiais_ferias: PolicialFerias[];

    @OneToMany(type => PolicialAtestado, policialatestado => policialatestado.policial)
    policiais_atestados: PolicialAtestado[];

    @OneToMany(type => ArmamentoEmprestimo, armamentoemprestimo => armamentoemprestimo.policial)
    armamentos_emprestimos: ArmamentoEmprestimo[];

    @OneToMany(type => Unidade, unidade => unidade.comandante)
    comandantes_unidades: Unidade[];
    
    @OneToMany(type => Unidade, unidade => unidade.subcomandante)
    subcomandantes_unidades: Unidade[];

    @OneToMany(type => Subunidade, subunidade => subunidade.comandante)
    comandantes_subunidades: Subunidade[];
    
    @OneToMany(type => Subunidade, subunidade => subunidade.subcomandante)
    subcomandantes_subunidades: Subunidade[];

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