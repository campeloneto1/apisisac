import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Entity('users')
export class User {
  constructor(private utilitiesService: UtilitiesService){}

    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column({
      nullable: false,
      length: 100,
    })
    nome!: string;
  
    @Column({
      length: 11,
      nullable: true,
    })
    telefone?: string;
  
    @Column({
      length: 100,
      nullable: true,
      unique: true
    })
    email?: string;
  
    @Column({
      length: 11,
      unique: true,
      nullable: false,
    })
    cpf!: string;
  
    @Column({
      length: 100,
      nullable: false,
      select: false
    })
    password!: string;
  
    @Column({
      length: 100,
      unique: true,
      nullable: false,
      select: false
    })
    salt!: string;

    @BeforeInsert()
    async hashPassword() {
      this.salt = this.utilitiesService.generateSalt(60);
      this.password = await this.utilitiesService.hashString(`${this.cpf}${this.salt}`);
    }
}