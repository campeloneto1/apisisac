import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Modelo } from 'src/modelos/modelo.entity';
import { Subunidade } from 'src/subunidades/subunidade.entity';
import { MaterialConsumoTipo } from 'src/materiais-consumo-tipos/material-consumo-tipo.entity';
import { MaterialConsumoSaidaItem } from 'src/materiais-consumo-saidas-itens/material-consumo-saida-item.entity';

@Entity('materiais_consumo')
@Index(['serial', 'subunidade'], { unique: true }) 
export class MaterialConsumo {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: true,
      length: 100,
    })
    serial!: string;

    @Column({
        nullable: false,
      })
      quantidade!: number;

      @Column({
        nullable: false,
      })
      quantidade_disponivel!: number;

      @Column({
        nullable: true,
      })
      quantidade_alerta!: number;
  
    @Column({
      nullable: true,
      type: 'date'
    })
    data_validade!: Date;

    @Column({
        nullable: true,
        type: 'date'
      })
      data_baixa!: Date;

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

    @ManyToOne(() => Modelo, (modelo) => modelo.id, {
      eager: true,
      onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    modelo!: Modelo;

    @ManyToOne(() => MaterialConsumoTipo, (materialconsumotipo) => materialconsumotipo.id, {
        eager: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      material_consumo_tipo!: MaterialConsumoTipo;

      @OneToMany(type => MaterialConsumoSaidaItem, materiaisconsumosaidasitens => materiaisconsumosaidasitens.material_consumo)
      materiais_consumo_saidas_itens: MaterialConsumoSaidaItem[];

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