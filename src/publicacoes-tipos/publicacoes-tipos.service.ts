import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicacaoTipo as PublicacaoTipoEntity } from './publicacao-tipo.entity';
import { PublicacaoTipo as PublicacaoTipoInterface, PublicacoesTipos as PublicacoesTiposInterface } from './publicacao-tipo.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PublicacoesTiposService {
    constructor(
        @InjectRepository(PublicacaoTipoEntity)
        private sexoRepository: Repository<PublicacaoTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PublicacoesTiposInterface> {
        return await this.sexoRepository.find();
      }
  
      async find(id: number): Promise<PublicacaoTipoInterface | null> {
        return await this.sexoRepository.findOne({where: {id: id}});
      }
  
      async create(object: PublicacaoTipoInterface, idUser: User) {
        var object:PublicacaoTipoInterface = this.sexoRepository.create({...object, created_by: idUser}) 
        var save = await this.sexoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tipo de pulbicacao',
          tipo: 1,
          table: 'publicacoes_tipos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PublicacaoTipoInterface, idUser: User) {
        var data: PublicacaoTipoInterface = await this.sexoRepository.findOneBy({id: id});
        data = {...object}
        await this.sexoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de pulbicacao',
          tipo: 2,
          table: 'publicacoes_tipos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.sexoRepository.findOne({where: {
          id: id,
        }});
        await this.sexoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de pulbicacao',
          tipo: 3,
          table: 'publicacoes_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
