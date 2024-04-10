import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User as UserEntity } from './user.entity';
import { User as UserInterface, Users as UsersInterface } from './user.interface';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Injectable()
export class UsersService {
   
    constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      private utilitiesService: UtilitiesService,
      private lazyModuleLoader: LazyModuleLoader
    ) {}

    async index(): Promise<UsersInterface> {
      return await this.usersRepository.find();
    }

    async find(id: number): Promise<UserInterface | null> {
      return await this.usersRepository.findOne({where: {id: id}});
    }

    async create(object: UserInterface, idUser: UserInterface) {
      object.salt = await this.utilitiesService.generateSalt(10);
      object.password = await this.utilitiesService.hashString(`${object.cpf}${object.salt}`);

      var object:UserInterface = this.usersRepository.create({...object, created_by: idUser}) 
      await this.usersRepository.save(object);      
    }

    async update(id:number, object: UserInterface, idUser: UserInterface) {
      var data: UserInterface = await this.usersRepository.findOneBy({id: id});
      data = {...object}
      await this.usersRepository.update({id:id},{...data, updated_by: idUser});
    }

    async remove(id: number, idUser: UserInterface) {
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
          relations: ['perfil']
      });
      return user;
    }
}
