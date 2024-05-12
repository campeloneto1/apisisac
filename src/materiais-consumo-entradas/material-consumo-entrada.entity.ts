import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { MaterialConsumoEntradaItem } from 'src/materiais-consumo-entradas-itens/material-consumo-entrada-item.entity';

@Entity('materiais_consumo_entrada')
export class MaterialConsumoEntrada {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      nullable: true,
      type: 'datetime'
    })
    data_entrada!: Date;

      @Column({
        nullable: true,
        type: 'text'
      })
      observacoes!: string;

      @ManyToOne(() => Subunidade, (subunidade) => subunidade.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      subunidade!: Subunidade;

      @ManyToOne(() => User, (user) => user.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      user!: User;

      @OneToMany(type => MaterialConsumoEntradaItem, materiaisconsumoentradasitens => materiaisconsumoentradasitens.material_consumo_entrada)
      materiais_consumo_entradas_itens: MaterialConsumoEntradaItem[];

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