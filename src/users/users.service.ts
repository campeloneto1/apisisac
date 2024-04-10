import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';
import { User as UserInterface, Users as UsersInterface } from './user.interface';

@Injectable()
export class UsersService {
   
    constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
    ) {}

    async index(): Promise<UsersInterface> {
      return await this.usersRepository.find();
    }

    async find(id: number): Promise<UserInterface | null> {
      return await this.usersRepository.findOneBy({ id });
    }

    async create(object: UserInterface) {
      var object:UserInterface = this.usersRepository.create({...object}) 
      await this.usersRepository.save(object);      
    }

    async update(id:number, object: UserInterface) {
      var data: UserInterface = await this.usersRepository.findOneBy({id: id});
      data = {...object}
      await this.usersRepository.update({id:id},{...data});
    }

    async remove(id: number) {
      return await this.usersRepository.delete(id);;
    }

    async signIn(username: string): Promise<UserInterface> {
      const user: UserInterface = await this.usersRepository.findOne({
          where: {cpf: username}, 
          select: {
              id: true,
              nome: true,
              cpf: true,
              password: true,
              salt:true,
          },
          
      });
      return user;
    }
}
