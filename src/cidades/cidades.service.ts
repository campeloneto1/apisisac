import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cidade as CidadeEntity } from './cidade.entity';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Cidade as CidadeInterface, Cidades as CidadesInterface } from './cidade.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class CidadesService {
    constructor(
        @InjectRepository(CidadeEntity)
        private cidadeRepository: Repository<CidadeEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<CidadesInterface> {
        return await this.cidadeRepository.find();
      }
  
      async find(id: number): Promise<CidadeInterface | null> {
        return await this.cidadeRepository.findOne({where: {id: id}});
      }
  
      async create(object: CidadeInterface, idUser: User) {
        var object:CidadeInterface = this.cidadeRepository.create({...object, created_by: idUser}) 
        await this.cidadeRepository.save(object);      
      }
  
      async update(id:number, object: CidadeInterface, idUser: User) {
        var data: CidadeInterface = await this.cidadeRepository.findOneBy({id: id});
        data = {...object}
        await this.cidadeRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.cidadeRepository.delete(id);;
      }
}
