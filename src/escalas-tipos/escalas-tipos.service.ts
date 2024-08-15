import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { EscalaTipo as EscalaTipoEntity } from './escala-tipo.entity';
import { EscalaTipo as EscalaTipoInterface, EscalasTipos as EscalasTiposInterface } from './escala-tipo.interface';

@Injectable()
export class EscalasTiposService {
    constructor(
        @InjectRepository(EscalaTipoEntity)
        private escalaTipoRepository: Repository<EscalaTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<EscalasTiposInterface> {
        return await this.escalaTipoRepository.find();
      }
  
      async find(id: number): Promise<EscalaTipoInterface | null> {
        return await this.escalaTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: EscalaTipoInterface, idUser: User) {
        var object:EscalaTipoInterface = this.escalaTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.escalaTipoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tipo de escala',
          tipo: 1,
          table: 'escalas_tipos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: EscalaTipoInterface, idUser: User) {
        var data: EscalaTipoInterface = await this.escalaTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.escalaTipoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de escala',
          tipo: 2,
          table: 'escalas_tipos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.escalaTipoRepository.findOne({where: {
          id: id,
        }});
        await this.escalaTipoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de escala',
          tipo: 3,
          table: 'escalas_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
