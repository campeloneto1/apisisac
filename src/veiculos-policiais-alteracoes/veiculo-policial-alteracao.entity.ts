import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Veiculo } from 'src/veiculos/veiculo.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Cidade } from 'src/cidades/cidade.entity';
import { VeiculoPolicial } from 'src/veiculos-policiais/veiculo-policial.entity';

@Entity('veiculos_policiais_alteracoes')
export class VeiculoPolicialAlteracao {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne(() => VeiculoPolicial, (veiculopolicial) => veiculopolicial.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    veiculo_policial!: VeiculoPolicial;
    
    @Column({
        nullable: false,
        length: 100,
      })
      foto!: string;
      
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