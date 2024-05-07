import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoTamanho as ArmamentoTamanhoEntity } from './armamento-tamanho.entity';
import { ArmamentoTamanho as ArmamentoTamanhoInterface, ArmamentosTamanhos as ArmamentosTamanhosInterface } from './armamento-tamanho.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ArmamentosTamanhosService {
    constructor(
        @InjectRepository(ArmamentoTamanhoEntity)
        private armamentoTipoRepository: Repository<ArmamentoTamanhoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosTamanhosInterface> {
        return await this.armamentoTipoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoTamanhoInterface | null> {
        return await this.armamentoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoTamanhoInterface, idUser: User) {
        var object:ArmamentoTamanhoInterface = this.armamentoTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.armamentoTipoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tamanho de armamento',
          tipo: 1,
          table: 'armamentos_tamanhos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: ArmamentoTamanhoInterface, idUser: User) {
        var data: ArmamentoTamanhoInterface = await this.armamentoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoTipoRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tamanho de armamento',
          tipo: 2,
          table: 'armamentos_tamanhos',
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
          mensagem: 'Excluiu um tamanhos de armamento',
          tipo: 3,
          table: 'armamentos_tamanhos',
          fk: data.id,
          user: idUser
        });
      }
}
