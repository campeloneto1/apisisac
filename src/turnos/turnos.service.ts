import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Turno as TurnoEntity } from './turno.entity';
import { Turno as TurnoInterface, Turnos as TurnosInterface } from './turno.interface';

@Injectable()
export class TurnosService {
    constructor(
        @InjectRepository(TurnoEntity)
        private postoRepository: Repository<TurnoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<TurnosInterface> {
        return await this.postoRepository.find();
      }
  
      async find(id: number): Promise<TurnoInterface | null> {
        return await this.postoRepository.findOne({where: {id: id}});
      }
  
      async create(object: TurnoInterface, idUser: User) {
        var object:TurnoInterface = this.postoRepository.create({...object, created_by: idUser}) 
        var save = await this.postoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um turno',
          tipo: 1,
          table: 'turnos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: TurnoInterface, idUser: User) {
        var data: TurnoInterface = await this.postoRepository.findOneBy({id: id});
        data = {...object}
        await this.postoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um turno',
          tipo: 2,
          table: 'turnos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.postoRepository.findOne({where: {
          id: id,
        }});
        await this.postoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um turno',
          tipo: 3,
          table: 'turnos',
          fk: data.id,
          user: idUser
        });
      }
}
