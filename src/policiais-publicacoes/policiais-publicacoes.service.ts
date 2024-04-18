import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { PolicialPublicacao as PolicialPublicacaoEntity } from './policial-publicacao.entity';
import { PolicialPublicacao as PolicialPublicacaoInterface, PoliciaisPublicacoes as PoliciaisPublicacoesInterface } from './policial-publicacao.interface';

@Injectable()
export class PoliciaisPublicacoesService {
    constructor(
        @InjectRepository(PolicialPublicacaoEntity)
        private policialFeriasRepository: Repository<PolicialPublicacaoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PoliciaisPublicacoesInterface> {
        return await this.policialFeriasRepository.find();
      }
  
      async find(id: number): Promise<PolicialPublicacaoInterface | null> {
        return await this.policialFeriasRepository.findOne({where: {id: id}});
      }
  
      async create(object: PolicialPublicacaoInterface, idUser: User) {
        var object:PolicialPublicacaoInterface = this.policialFeriasRepository.create({...object, created_by: idUser}) 
        await this.policialFeriasRepository.save(object);      
      }
  
      async update(id:number, object: PolicialPublicacaoInterface, idUser: User) {
        var data: PolicialPublicacaoInterface = await this.policialFeriasRepository.findOneBy({id: id});
        data = {...object}
        await this.policialFeriasRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.policialFeriasRepository.delete(id);;
      }
}
