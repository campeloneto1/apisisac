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
  
    @Column({ nullable: true, }) administrador!: boolean;
    @Column({ nullable: true, }) gestor!: boolean;
    @Column({ nullable: true, }) relatorios!: boolean;

    @Column({ nullable: true, }) usuarios!: boolean;
    @Column({ nullable: true, }) usuarios_cad!: boolean;
    @Column({ nullable: true, }) usuarios_edt!: boolean;
    @Column({ nullable: true, }) usuarios_del!: boolean;

    @Column({ nullable: true, }) policiais!: boolean;
    @Column({ nullable: true, }) policiais_cad!: boolean;
    @Column({ nullable: true, }) policiais_edt!: boolean;
    @Column({ nullable: true, }) policiais_del!: boolean;

    @Column({ nullable: true, }) policiais_atestados!: boolean;
    @Column({ nullable: true, }) policiais_atestados_cad!: boolean;
    @Column({ nullable: true, }) policiais_atestados_edt!: boolean;
    @Column({ nullable: true, }) policiais_atestados_del!: boolean;

    @Column({ nullable: true, }) policiais_ferias!: boolean;
    @Column({ nullable: true, }) policiais_ferias_cad!: boolean;
    @Column({ nullable: true, }) policiais_ferias_edt!: boolean;
    @Column({ nullable: true, }) policiais_ferias_del!: boolean;

    @Column({ nullable: true, }) policiais_publicacoes!: boolean;
    @Column({ nullable: true, }) policiais_publicacoes_cad!: boolean;
    @Column({ nullable: true, }) policiais_publicacoes_edt!: boolean;
    @Column({ nullable: true, }) policiais_publicacoes_del!: boolean;

    @Column({ nullable: true, }) armamentos!: boolean;
    @Column({ nullable: true, }) armamentos_cad!: boolean;
    @Column({ nullable: true, }) armamentos_edt!: boolean;
    @Column({ nullable: true, }) armamentos_del!: boolean;

    @Column({ nullable: true, }) armamentos_emprestimos!: boolean;
    @Column({ nullable: true, }) armamentos_emprestimos_cad!: boolean;
    @Column({ nullable: true, }) armamentos_emprestimos_edt!: boolean;
    @Column({ nullable: true, }) armamentos_emprestimos_del!: boolean;

    @OneToMany(type => User, user => user.perfil)
    users: User[];

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