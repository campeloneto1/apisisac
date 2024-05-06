import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Curso as CursoEntity } from './curso.entity';
import { Curso as CursoInterface, Cursos as CursosInterface } from './curso.interface';
@Injectable()
export class CursosService {
    constructor(
        @InjectRepository(CursoEntity)
        private cursoRepository: Repository<CursoEntity>,
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
        await this.cursoRepository.save(object);      
      }
  
      async update(id:number, object: CursoInterface, idUser: User) {
        var data: CursoInterface = await this.cursoRepository.findOneBy({id: id});
        data = {...object}
        await this.cursoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.cursoRepository.delete(id);;
      }
}
