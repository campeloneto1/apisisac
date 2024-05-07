import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modelo as ModeloEntity } from './modelo.entity';
import { Modelo as ModeloInterface, Modelos as ModelosInterface  } from './modelo.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ModelosService {
    constructor(
        @InjectRepository(ModeloEntity)
        private modeloRepository: Repository<ModeloEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ModelosInterface> {
        return await this.modeloRepository.find();
      }
  
      async find(id: number): Promise<ModeloInterface | null> {
        return await this.modeloRepository.findOne({where: {id: id}});
      }
  
      async create(object: ModeloInterface, idUser: User) {
        var object:ModeloInterface = this.modeloRepository.create({...object, created_by: idUser}) 
       var save =  await this.modeloRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um modelo',
          tipo: 1,
          table: 'modelos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: ModeloInterface, idUser: User) {
        var data: ModeloInterface = await this.modeloRepository.findOneBy({id: id});
        data = {...object}
        await this.modeloRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um modelo',
          tipo: 2,
          table: 'modelos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.modeloRepository.findOne({where: {
          id: id,
        }});
        await this.modeloRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um modelo',
          tipo: 3,
          table: 'modelos',
          fk: data.id,
          user: idUser
        });
      }

      async whereMarca(id: number): Promise<ModelosInterface | null> {
        return await this.modeloRepository.find({
          where: {
            marca: {
              id: id,
            },
          },
        });
      }
}
