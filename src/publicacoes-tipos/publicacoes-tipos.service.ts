import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicacaoTipo as PublicacaoTipoEntity } from './publicacao-tipo.entity';
import { PublicacaoTipo as PublicacaoTipoInterface, PublicacoesTipos as PublicacoesTiposInterface } from './publicacao-tipo.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class PublicacoesTiposService {
    constructor(
        @InjectRepository(PublicacaoTipoEntity)
        private sexoRepository: Repository<PublicacaoTipoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PublicacoesTiposInterface> {
        return await this.sexoRepository.find();
      }
  
      async find(id: number): Promise<PublicacaoTipoInterface | null> {
        return await this.sexoRepository.findOne({where: {id: id}});
      }
  
      async create(object: PublicacaoTipoInterface, idUser: User) {
        var object:PublicacaoTipoInterface = this.sexoRepository.create({...object, created_by: idUser}) 
        await this.sexoRepository.save(object);      
      }
  
      async update(id:number, object: PublicacaoTipoInterface, idUser: User) {
        var data: PublicacaoTipoInterface = await this.sexoRepository.findOneBy({id: id});
        data = {...object}
        await this.sexoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.sexoRepository.delete(id);;
      }
}
