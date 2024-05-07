import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmamentoTipo as ArmamentoTipoEntity } from './armamento-tipo.entity';
import { ArmamentoTipo as ArmamentoTipoInterface, ArmamentosTipos as ArmamentosTiposInterface } from './armamento-tipo.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ArmamentosTiposService {
    constructor(
        @InjectRepository(ArmamentoTipoEntity)
        private armamentoTipoRepository: Repository<ArmamentoTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosTiposInterface> {
        return await this.armamentoTipoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoTipoInterface | null> {
        return await this.armamentoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoTipoInterface, idUser: User) {
        var object:ArmamentoTipoInterface = this.armamentoTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.armamentoTipoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tipo de armamento',
          tipo: 1,
          table: 'armamentos_tipos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: ArmamentoTipoInterface, idUser: User) {
        var data: ArmamentoTipoInterface = await this.armamentoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoTipoRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de armamento',
          tipo: 2,
          table: 'armamentos_tipos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.armamentoTipoRepository.findOne({where: {
          id: id,
        }});
        await this.armamentoTipoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de armamento',
          tipo: 3,
          table: 'armamentos_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
