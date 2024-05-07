import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Curso as CursoEntity } from './curso.entity';
import { Curso as CursoInterface, Cursos as CursosInterface } from './curso.interface';
import { LogsService } from 'src/logs/logs.service';
@Injectable()
export class CursosService {
    constructor(
        @InjectRepository(CursoEntity)
        private cursoRepository: Repository<CursoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<CursosInterface> {
        return await this.cursoRepository.find();
      }
  
      async find(id: number): Promise<CursoInterface | null> {
        return await this.cursoRepository.findOne({where: {id: id}});
      }
  
      async create(object: CursoInterface, idUser: User) {
        var object:CursoInterface = this.cursoRepository.create({...object, created_by: idUser}) 
        var save = await this.cursoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um curso',
          tipo: 1,
          table: 'cursos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: CursoInterface, idUser: User) {
        var data: CursoInterface = await this.cursoRepository.findOneBy({id: id});
        data = {...object}
        await this.cursoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um curso',
          tipo: 2,
          table: 'cursos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.cursoRepository.findOne({where: {
          id: id,
        }});
        await this.cursoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um curso',
          tipo: 3,
          table: 'cursos',
          fk: data.id,
          user: idUser
        });
      }
}
