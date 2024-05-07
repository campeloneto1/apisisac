import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { PatrimonioTipo as PatrimonioTipoEntity } from './patrimonio-tipo.entity';
import { PatrimonioTipo as PatrimonioTipoInterface, PatrimoniosTipos as PatrimoniosTiposInterface } from './patrimonio-tipo.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PatrimoniosTiposService {
    constructor(
        @InjectRepository(PatrimonioTipoEntity)
        private patrimonioTipoRepository: Repository<PatrimonioTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PatrimoniosTiposInterface> {
        return await this.patrimonioTipoRepository.find();
      }
  
      async find(id: number): Promise<PatrimonioTipoInterface | null> {
        return await this.patrimonioTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: PatrimonioTipoInterface, idUser: User) {
        var object:PatrimonioTipoInterface = this.patrimonioTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.patrimonioTipoRepository.save(object); 
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tipo de patrimonio',
          tipo: 1,
          table: 'patrimonios_tipos',
          fk: save.id,
          user: idUser
        });     
      }
  
      async update(id:number, object: PatrimonioTipoInterface, idUser: User) {
        var data: PatrimonioTipoInterface = await this.patrimonioTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.patrimonioTipoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de patrimonio',
          tipo: 2,
          table: 'patrimonios_tipos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.patrimonioTipoRepository.findOne({where: {
          id: id,
        }});
        await this.patrimonioTipoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de patrimonio',
          tipo: 3,
          table: 'patrimonios_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
