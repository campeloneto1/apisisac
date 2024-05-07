import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Cor as CorEntity } from './cor.entity';
import { Cor as CorInterface, Cores as CoresInterface } from './cor.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class CoresService {
    constructor(
        @InjectRepository(CorEntity)
        private corRepository: Repository<CorEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<CoresInterface> {
        return await this.corRepository.find();
      }
  
      async find(id: number): Promise<CorInterface | null> {
        return await this.corRepository.findOne({where: {id: id}});
      }
  
      async create(object: CorInterface, idUser: User) {
        var object:CorInterface = this.corRepository.create({...object, created_by: idUser}) 
        var save = await this.corRepository.save(object);    
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma cor',
          tipo: 1,
          table: 'cores',
          fk: save.id,
          user: idUser
        });  
      }
  
      async update(id:number, object: CorInterface, idUser: User) {
        var data: CorInterface = await this.corRepository.findOneBy({id: id});
        data = {...object}
        await this.corRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma cor',
          tipo: 2,
          table: 'cores',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.corRepository.findOne({where: {
          id: id,
        }});
        await this.corRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma cor',
          tipo: 3,
          table: 'cores',
          fk: data.id,
          user: idUser
        });
      }
}
