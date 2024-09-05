import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { AfastamentoTipo as AfastamentoTipoEntity } from './afastamento-tipo.entity';
import { AfastamentoTipo as AfastamentoTipoInterface, AfastamentosTipos as AfastamentosTiposInterface  } from './afastamento-tipo.interface';

@Injectable()
export class AfastamentosTiposService {
    constructor(
        @InjectRepository(AfastamentoTipoEntity)
        private afastamentoTipoRepository: Repository<AfastamentoTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<AfastamentosTiposInterface> {
      
        return await this.afastamentoTipoRepository.find();
      }
  
      async find(id: number): Promise<AfastamentoTipoInterface | null> {
        return await this.afastamentoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: AfastamentoTipoInterface, idUser: User) {
        var object:AfastamentoTipoInterface = this.afastamentoTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.afastamentoTipoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Tipo de Afastamento',
          tipo: 1,
          table: 'afastamentos_tipos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: AfastamentoTipoInterface, idUser: User) {
        var data: AfastamentoTipoInterface = await this.afastamentoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.afastamentoTipoRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de afastamento',
          tipo: 2,
          table: 'afastamentos_tipos',
          fk: id,
          user: idUser
        });

      }
  
      async remove(id: number, idUser: User) {
        var data = await this.afastamentoTipoRepository.findOne({where: {
          id: id,
        }});
        await this.afastamentoTipoRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de afastamento',
          tipo: 3,
          table: 'afastamentos_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
