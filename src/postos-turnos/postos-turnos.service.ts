import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { PostoTurno as PostoTurnoEntity } from './posto-turno.entity';
import { PostoTurno as PostoTurnoInterface, PostosTurnos as PostosTurnosInterface } from './posto-turno.interface';

@Injectable()
export class PostosTurnosService {
    constructor(
        @InjectRepository(PostoTurnoEntity)
        private postoTurnoRepository: Repository<PostoTurnoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PostosTurnosInterface> {
        return await this.postoTurnoRepository.find();
      }
  
      async find(id: number): Promise<PostoTurnoInterface | null> {
        return await this.postoTurnoRepository.findOne({where: {id: id}});
      }
  
      async create(object: PostoTurnoInterface, idUser: User) {
        var object:PostoTurnoInterface = this.postoTurnoRepository.create({...object, created_by: idUser}) 
        var save = await this.postoTurnoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um turno no posto',
          tipo: 1,
          table: 'postos_turnos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PostoTurnoInterface, idUser: User) {
        var data: PostoTurnoInterface = await this.postoTurnoRepository.findOneBy({id: id});
        data = {...object}
        await this.postoTurnoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um turno no posto',
          tipo: 2,
          table: 'postos_turnos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.postoTurnoRepository.findOne({where: {
          id: id,
        }});
        await this.postoTurnoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um turno no posto',
          tipo: 3,
          table: 'postos_turnos',
          fk: data.id,
          user: idUser
        });
      }
}
