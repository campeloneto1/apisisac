import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('armamentos_tipos')
export class ArmamentoTipo {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
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

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}