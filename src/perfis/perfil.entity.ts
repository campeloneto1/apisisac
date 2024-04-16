import { Entity, Column, PrimaryGeneratedColumn, OneToMany , ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity('perfis')
export class Perfil {

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
    administrador!: boolean;

    @Column({
        nullable: true,
      })
      gestor!: boolean;

      @Column({
        nullable: true,
      })
      relatorios!: boolean;
  
      @OneToMany(type => User, user => user.perfil)
      users: User[];

      @ManyToOne(() => User, (user) => user.id)
      created_by!: User;

      @ManyToOne(() => User, (user) => user.id)
      updated_by!: User;

      @CreateDateColumn()
      created_at!: Date;

      @UpdateDateColumn()
      updated_at!: Date;
}