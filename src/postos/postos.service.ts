import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Posto as PostoEntity } from './posto.entity';
import { Posto as PostoInterface, Postos as PostosInterface } from './posto.interface';

@Injectable()
export class PostosService {
    constructor(
        @InjectRepository(PostoEntity)
        private postoRepository: Repository<PostoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PostosInterface> {
        return await this.postoRepository.find();
      }
  
      async find(id: number): Promise<PostoInterface | null> {
        return await this.postoRepository.findOne({where: {id: id}});
      }
  
      async create(object: PostoInterface, idUser: User) {
        var object:PostoInterface = this.postoRepository.create({...object, created_by: idUser}) 
        var save = await this.postoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um posto',
          tipo: 1,
          table: 'postos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PostoInterface, idUser: User) {
        var data: PostoInterface = await this.postoRepository.findOneBy({id: id});
        data = {...object}
        await this.postoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um posto',
          tipo: 2,
          table: 'postos',
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
          mensagem: 'Excluiu um posto',
          tipo: 3,
          table: 'postos',
          fk: data.id,
          user: idUser
        });
      }
}
