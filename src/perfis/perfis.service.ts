import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Perfil as PerfilEntity } from './perfil.entity';
import { Perfil as PerfilInterface, Perfis as PerfisInterface } from './perfil.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class PerfisService {
    constructor(
        @InjectRepository(PerfilEntity)
        private perfilRepository: Repository<PerfilEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PerfisInterface> {
        return await this.perfilRepository.find();
      }
  
      async find(id: number): Promise<PerfilInterface | null> {
        return await this.perfilRepository.findOne({where: {id: id}});
      }
  
      async create(object: PerfilInterface, idUser: User) {
        var object:PerfilInterface = this.perfilRepository.create({...object, created_by: idUser}) 
        await this.perfilRepository.save(object);      
      }
  
      async update(id:number, object: PerfilInterface, idUser: User) {
        var data: PerfilInterface = await this.perfilRepository.findOneBy({id: id});
        data = {...object}
        await this.perfilRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.perfilRepository.delete(id);;
      }
}
