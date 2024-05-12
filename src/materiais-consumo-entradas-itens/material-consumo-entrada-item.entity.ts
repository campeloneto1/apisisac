import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    Index,
  } from 'typeorm';
  import { User } from 'src/users/user.entity';
import { MaterialConsumo } from 'src/materiais-consumo/material-consumo.entity';
import { MaterialConsumoEntrada } from 'src/materiais-consumo-entradas/material-consumo-entrada.entity';
  
  @Entity('materiais_consumo_entradas_itens')
  @Index(['material_consumo', 'material_consumo_entrada'], { unique: true }) 
  export class MaterialConsumoEntradaItem {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
    })
    quantidade!: number;
  
    @ManyToOne(() => MaterialConsumo, (materialconsumo) => materialconsumo.id, {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    material_consumo!: MaterialConsumo;
  
    @ManyToOne(
      () => MaterialConsumoEntrada,
      (materialconsumoentrada) => materialconsumoentrada.id,
      {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    )
    material_consumo_entrada!: MaterialConsumoEntrada;
  
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
  