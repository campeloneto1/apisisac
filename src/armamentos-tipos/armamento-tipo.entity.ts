import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Armamento } from 'src/armamentos/armamento.entity';

@Entity('armamentos_tipos')
export class ArmamentoTipo {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
      unique: true
    })
    nome!: string;

    @Column({
      nullable: true,
    })
    calibres!: boolean;

    @Column({
      nullable: true,
    })
    tamanhos!: boolean;

    @OneToMany(type => Armamento, armamento => armamento.armamento_tipo)
    armamentos: Armamento[];

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