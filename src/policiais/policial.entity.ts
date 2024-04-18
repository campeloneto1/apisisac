import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Cidade } from 'src/cidades/cidade.entity';
import { Sexo } from 'src/sexos/sexo.entity';
import { Graduacao } from 'src/graduacoes/graduacao.entity';
import { Setor } from 'src/setores/setor.entity';

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

    @ManyToOne(() => Cidade, (cidade) => cidade.id, {
        eager: true,
    })
    cidade!: Cidade;

    @ManyToOne(() => Sexo, (sexo) => sexo.id, {
        eager: true,
    })
    sexo!: Sexo;

    @ManyToOne(() => Graduacao, (graduacao) => graduacao.id, {
        eager: true,
    })
    graduacao!: Graduacao;

    @ManyToOne(() => Setor, (setor) => setor.id, {
        eager: true,
    })
    setor!: Setor;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updated_at!: Date;
    
}