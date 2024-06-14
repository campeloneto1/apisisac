import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity('contratos_tipos')
export class ContratoTipo {

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
      diarias!: boolean;   

      @Column({
        nullable: true,
      })
      servico!: boolean;   

      @Column({
        nullable: true,
      })
      fatura!: boolean;   

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