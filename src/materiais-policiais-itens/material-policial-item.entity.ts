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
  import { Material } from 'src/materiais/material.entity';
  import { MaterialPolicial } from 'src/materiais-policiais/material-policial.entity';
  
  @Entity('materiais_policiais_itens')
  @Index(['material', 'material_policial'], { unique: true }) 
  export class MaterialPolicialItem {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({
      nullable: false,
    })
    quantidade!: number;
  
    @Column({
      nullable: true,
    })
    quantidade_devolucao!: number;
  
    @ManyToOne(() => Material, (material) => material.id, {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    material!: Material;
  
    @ManyToOne(
      () => MaterialPolicial,
      (material_policial) => material_policial.id,
      {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    )
    @JoinColumn()
    material_policial!: MaterialPolicial;
  
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
  