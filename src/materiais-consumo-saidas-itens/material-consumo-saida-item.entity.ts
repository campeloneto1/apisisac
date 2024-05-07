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
import { MaterialConsumoSaida } from 'src/materiais-consumo-saidas/material-consumo-saida.entity';
  
  @Entity('materiais_consumo_saidas_itens')
  @Index(['material_consumo', 'material_consumo_saida'], { unique: true }) 
  export class MaterialConsumoSaidaItem {
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
      () => MaterialConsumoSaida,
      (materialconsumosaida) => materialconsumosaida.id,
      {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    )
    @JoinColumn()
    material_consumo_saida!: MaterialConsumoSaida;
  
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
  