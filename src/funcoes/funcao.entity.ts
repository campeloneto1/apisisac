import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';
import { Policial } from 'src/policiais/policial.entity';

@Entity('funcoes')
export class Funcao {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
        nullable: false,
        length: 100,
        unique: true
      })
      nome!: string;

      @OneToMany(type => Policial, policial => policial.funcao)
    policiais: Policial[];
    

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