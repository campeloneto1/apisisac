import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Pais } from 'src/paises/pais.entity';
import { Cidade } from 'src/cidades/cidade.entity';

@Entity('estados')
export class Estado {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
    })
    nome!: string;
  
    @Column({
      nullable: false,
      length: 5
    })
    abreviatura!: string;

    @ManyToOne(() => Pais, (pais) => pais.id, {
      eager: true,
      onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
  })
    pais!: Pais;

    @OneToMany(type => Cidade, cidade => cidade.estado)
    cidades: Cidade[];

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