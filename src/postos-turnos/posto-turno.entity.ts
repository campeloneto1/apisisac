import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { Posto } from 'src/postos/posto.entity';
import { Turno } from 'src/turnos/turno.entity';

@Entity('postos_turnos')
export class PostoTurno {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Posto, (posto) => posto.id, {
      eager: true,
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
  })
  posto!: Posto;

  @ManyToOne(() => Turno, (turno) => turno.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    turno!: Turno;

    @Column({
        nullable: true,
      })
      ativo!: boolean;


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