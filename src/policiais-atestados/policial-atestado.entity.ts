import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
@Entity('policiais_atestados')
export class PolicialAtestado {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Policial, (policial) => policial.id, {
      onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
  })
    policial!: Policial;
  
    @Column({
      nullable: true,
        type: 'date'
    })
    data_inicial!: Date;

    @Column({
      nullable: true,
        type: 'date'
    })
    data_copem!: Date;
  
    @Column({
      nullable: false,
    })
    dias!: number;

    @Column({
      nullable: true,
        type: 'date'
    })
    data_final!: Date;
  

    @Column({
        nullable: true,
        length: 20,
      })
      cid!: string;

      @Column({
        nullable: true,
        length: 100,
      })
      hospital!: string;

      @Column({
        nullable: true,
        length: 20,
      })
      crm!: string;

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