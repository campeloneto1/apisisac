import { Entity, Column, PrimaryGeneratedColumn , ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { DocumentoTipo } from 'src/documentos-tipos/documento-tipo.entity';
import { Setor } from 'src/setores/setor.entity';

@Entity('documentos')
export class Documento {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
      })
      codigo!: string;
  
    @Column({
      nullable: false,
      length: 100,
    })
    titulo!: string;

    @Column({
        nullable: false,
        type: 'text'
      })
      texto!: string;

    @ManyToOne(() => DocumentoTipo, (documentotipo) => documentotipo.id, {
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          eager: true
      })
      documento_tipo!: DocumentoTipo;

      @ManyToOne(() => Setor, (setor) => setor.id, {
        onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          eager: true
      })
      setor!: Setor;

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