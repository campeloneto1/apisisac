import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Graduacao as GraduacaoEntity } from './graduacao.entity';
import { Graduacao as GraduacaoInterface, Graduacoes as GraduacoesInterface } from './graduacao.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class GraduacoesService {
    constructor(
        @InjectRepository(GraduacaoEntity)
        private paisRepository: Repository<GraduacaoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<GraduacoesInterface> {
        return await this.paisRepository.find();
      }
  
      async find(id: number): Promise<GraduacaoInterface | null> {
        return await this.paisRepository.findOne({where: {id: id}});
      }
  
      async create(object: GraduacaoInterface, idUser: User) {
        var object:GraduacaoInterface = this.paisRepository.create({...object, created_by: idUser}) 
        await this.paisRepository.save(object);      
      }
  
      async update(id:number, object: GraduacaoInterface, idUser: User) {
        var data: GraduacaoInterface = await this.paisRepository.findOneBy({id: id});
        data = {...object}
        await this.paisRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.paisRepository.delete(id);;
      }
}
