import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais as PaisEntity } from './pais.entity';
import { Pais as PaisInterface, Paises as PaisesInterface } from './pais.interface';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PaisesService {
    constructor(
        @InjectRepository(PaisEntity)
        private paisRepository: Repository<PaisEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PaisesInterface> {
        return await this.paisRepository.find();
      }
  
      async find(id: number): Promise<PaisInterface | null> {
        return await this.paisRepository.findOne({where: {id: id}});
      }
  
      async create(object: PaisInterface, idUser: User) {
        var object:PaisInterface = this.paisRepository.create({...object, created_by: idUser}) 
        var save = await this.paisRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um país',
          tipo: 1,
          table: 'paises',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PaisInterface, idUser: User) {
        var data: PaisInterface = await this.paisRepository.findOneBy({id: id});
        data = {...object}
        await this.paisRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um país',
          tipo: 2,
          table: 'paises',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.paisRepository.findOne({where: {
          id: id,
        }});
        await this.paisRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um país',
          tipo: 3,
          table: 'paises',
          fk: data.id,
          user: idUser
        });
      }
}
