import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
import { Curso } from 'src/cursos/curso.entity';

@Entity('policiais_cursos')
export class PolicialCurso {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Policial, (policial) => policial.id, {
      onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
  })
    policial!: Policial;

    @ManyToOne(() => Curso, (curso) => curso.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    curso!: Curso;
  
    @Column({
        nullable: true,
      })
      carga_horaria!: number;

      @Column({
        nullable: true,
        length: 100
      })
      boletim!: string;

      @Column({
        nullable: false,
        type: 'date'
      })
      data_inicial!: Date;

      @Column({
        nullable: false,
        type: 'date'
      })
      data_final!: Date;

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