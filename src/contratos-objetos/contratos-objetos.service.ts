import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { ContratoObjeto as ContratoObjetoEntity } from './contrato-objeto.entity';
import { ContratoObjeto as ContratoObjetoInterface, ContratosObjetos as ContratosObjetosInterface  } from './contrato-objeto.interface';

@Injectable()
export class ContratosObjetosService {
    constructor(
        @InjectRepository(ContratoObjetoEntity)
        private corRepository: Repository<ContratoObjetoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ContratosObjetosInterface> {
        return await this.corRepository.find();
      }
  
      async find(id: number): Promise<ContratoObjetoInterface | null> {
        return await this.corRepository.findOne({where: {id: id}});
      }
  
      async create(object: ContratoObjetoInterface, idUser: User) {
        var object:ContratoObjetoInterface = this.corRepository.create({...object, created_by: idUser}) 
        var save = await this.corRepository.save(object);    
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma objeto de contrato',
          tipo: 1,
          table: 'contratos_objetos',
          fk: save.id,
          user: idUser
        });  
      }
  
      async update(id:number, object: ContratoObjetoInterface, idUser: User) {
        var data: ContratoObjetoInterface = await this.corRepository.findOneBy({id: id});
        data = {...object}
        await this.corRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um objeto de contrato',
          tipo: 2,
          table: 'contratos_objetos',
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
          mensagem: 'Excluiu um objeto de contrato',
          tipo: 3,
          table: 'contratos_objetos',
          fk: data.id,
          user: idUser
        });
      }
}
