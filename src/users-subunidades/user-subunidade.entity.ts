import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { User } from 'src/users/user.entity';

@Entity('users_subunidades')
export class UserSubunidade {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }) // specify inverse side as a second parameter
    user: User

    @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    subunidade!: Subunidade;

    @ManyToOne(() => User, (user) => user.id, {
      onDelete: 'SET NULL'
    })
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id, {
      onDelete: 'SET NULL'
    })
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}