import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn,OneToMany, Index } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Patrimonio } from 'src/patrimonios/patrimonio.entity';

@Entity('setores')
@Index(['nome', 'subunidade'], { unique: true }) 
export class Setor {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        nullable: false,
        length: 100,
    })
    nome!: string;

    @Column({
        nullable: true,
        length: 20,
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

    @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    subunidade!: Subunidade;

    @OneToMany(type => Policial, policial => policial.setor)
    policiais: Policial[];

    @OneToMany(type => Patrimonio, patrimonio => patrimonio.setor)
    patrimonios: Patrimonio[];

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