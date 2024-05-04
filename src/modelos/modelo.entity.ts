import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Marca } from 'src/marcas/marca.entity';
import { Armamento } from 'src/armamentos/armamento.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';

@Entity('modelos')
@Index(['nome', 'marca'], { unique: true }) 
export class Modelo {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
    })
    nome!: string;
  
    @Column({
      nullable: true,
      length: 5
    })
    abreviatura!: string;

    @ManyToOne(() => Marca, (marca) => marca.id, {
      eager: true,
      onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
  })
    marca!: Marca;

    @OneToMany(type => Armamento, armamento => armamento.modelo)
    armamentos: Armamento[];
    
    @OneToMany(type => Veiculo, veiculo => veiculo.modelo)
    veiculos: Veiculo[];

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