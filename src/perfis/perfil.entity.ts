import { Entity, Column, PrimaryGeneratedColumn, OneToMany , ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity('perfis')
export class Perfil {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
      length: 100,
      unique: true
    })
    nome!: string;
  
    @Column({ nullable: true, }) administrador!: boolean;
    @Column({ nullable: true, }) gestor!: boolean;
    @Column({ nullable: true, }) relatorios!: boolean;

    @Column({ nullable: true, }) usuarios!: boolean;
    @Column({ nullable: true, }) usuarios_cad!: boolean;
    @Column({ nullable: true, }) usuarios_edt!: boolean;
    @Column({ nullable: true, }) usuarios_del!: boolean;

    @Column({ nullable: true, }) patrimonios!: boolean;
    @Column({ nullable: true, }) patrimonios_cad!: boolean;
    @Column({ nullable: true, }) patrimonios_edt!: boolean;
    @Column({ nullable: true, }) patrimonios_del!: boolean;

    @Column({ nullable: true, }) materiais!: boolean;
    @Column({ nullable: true, }) materiais_cad!: boolean;
    @Column({ nullable: true, }) materiais_edt!: boolean;
    @Column({ nullable: true, }) materiais_del!: boolean;

    @Column({ nullable: true, }) materiais_policiais!: boolean;
    @Column({ nullable: true, }) materiais_policiais_cad!: boolean;
    @Column({ nullable: true, }) materiais_policiais_edt!: boolean;
    @Column({ nullable: true, }) materiais_policiais_del!: boolean;

    @Column({ nullable: true, }) materiais_consumo!: boolean;
    @Column({ nullable: true, }) materiais_consumo_cad!: boolean;
    @Column({ nullable: true, }) materiais_consumo_edt!: boolean;
    @Column({ nullable: true, }) materiais_consumo_del!: boolean;

    @Column({ nullable: true, }) materiais_consumo_saidas!: boolean;
    @Column({ nullable: true, }) materiais_consumo_saidas_cad!: boolean;
    @Column({ nullable: true, }) materiais_consumo_saidas_edt!: boolean;
    @Column({ nullable: true, }) materiais_consumo_saidas_del!: boolean;

    @Column({ nullable: true, }) materiais_consumo_entradas!: boolean;
    @Column({ nullable: true, }) materiais_consumo_entradas_cad!: boolean;
    @Column({ nullable: true, }) materiais_consumo_entradas_edt!: boolean;
    @Column({ nullable: true, }) materiais_consumo_entradas_del!: boolean;

    @Column({ nullable: true, }) policiais!: boolean;
    @Column({ nullable: true, }) policiais_cad!: boolean;
    @Column({ nullable: true, }) policiais_edt!: boolean;
    @Column({ nullable: true, }) policiais_del!: boolean;

    @Column({ nullable: true, }) policiais_atestados!: boolean;
    @Column({ nullable: true, }) policiais_atestados_cad!: boolean;
    @Column({ nullable: true, }) policiais_atestados_edt!: boolean;
    @Column({ nullable: true, }) policiais_atestados_del!: boolean;

    @Column({ nullable: true, }) policiais_cursos!: boolean;
    @Column({ nullable: true, }) policiais_cursos_cad!: boolean;
    @Column({ nullable: true, }) policiais_cursos_edt!: boolean;
    @Column({ nullable: true, }) policiais_cursos_del!: boolean;


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

    @Column({ nullable: true, }) veiculos!: boolean;
    @Column({ nullable: true, }) veiculos_cad!: boolean;
    @Column({ nullable: true, }) veiculos_edt!: boolean;
    @Column({ nullable: true, }) veiculos_del!: boolean;

    @Column({ nullable: true, }) veiculos_oficinas!: boolean;
    @Column({ nullable: true, }) veiculos_oficinas_cad!: boolean;
    @Column({ nullable: true, }) veiculos_oficinas_edt!: boolean;
    @Column({ nullable: true, }) veiculos_oficinas_del!: boolean;

    @Column({ nullable: true, }) veiculos_policiais!: boolean;
    @Column({ nullable: true, }) veiculos_policiais_cad!: boolean;
    @Column({ nullable: true, }) veiculos_policiais_edt!: boolean;
    @Column({ nullable: true, }) veiculos_policiais_del!: boolean;

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