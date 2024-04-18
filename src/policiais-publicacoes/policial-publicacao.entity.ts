import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Policial } from 'src/policiais/policial.entity';
import { PublicacaoTipo } from 'src/publicacoes-tipos/publicacao-tipo.entity';
@Entity('policiais_publicacoes')
export class PolicialPublicacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Policial, (policial) => policial.id, {
      eager: true,
  })
    policial!: Policial;

    @ManyToOne(() => PublicacaoTipo, (publicacaoTipo) => publicacaoTipo.id, {
        eager: true,
    })
    publicacao_tipo!: PublicacaoTipo;
  
    @Column({
        nullable: false,
        length: 2000,
      })
      texto!: string;

    @Column({
        nullable: false,
        length: 40,
      })
      boletim!: string;

    @ManyToOne(() => User, (user) => user.id)
    created_by!: User;

    @ManyToOne(() => User, (user) => user.id)
    updated_by!: User;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}