import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Cidade } from 'src/cidades/cidade.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';

@Entity('unidades')
export class Unidade {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        nullable: false,
        length: 100,
    })
    nome!: string;

    @Column({
        nullable: false,
        length: 50,
    })
    abreviatura!: string;

    @Column({
        nullable: true,
        length: 11,
    })
    telefone!: string;

    @Column({
        nullable: true,
        length: 100,
        unique: true
    })
    email!: string;

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

    @ManyToOne(() => Cidade, (cidade) => cidade.id)
    cidade!: Cidade;

    @OneToMany(type => Subunidade, subunidade => subunidade.unidade)
    subunidades: Subunidade[];

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}