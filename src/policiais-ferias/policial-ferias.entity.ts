import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
@Entity('policiais_ferias')
export class PolicialFerias {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Policial, (policial) => policial.id, {
      eager: true,
  })
    policial!: Policial;
  
    @Column({
      nullable: true,
        type: 'date'
    })
    data_inicial!: Date;
  
    @Column({
      nullable: false,
    })
    dias!: number;

    @Column({
        nullable: true,
        length: 30,
      })
      boletim!: string;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}