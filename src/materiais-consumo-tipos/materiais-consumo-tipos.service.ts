import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { MaterialConsumoTipo as MaterialConsumoTipoEntity } from './material-consumo-tipo.entity';
import { MaterialConsumoTipo as MaterialConsumoTipoInterface, MateriaisConsumoTipos as MateriaisConsumoTiposInterface} from './material-consumo-tipo.interface';

@Injectable()
export class MateriaisConsumoTiposService {
    constructor(
        @InjectRepository(MaterialConsumoTipoEntity)
        private materialConsumoTipoRepository: Repository<MaterialConsumoTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<MateriaisConsumoTiposInterface> {
        return await this.materialConsumoTipoRepository.find();
      }
  
      async find(id: number): Promise<MaterialConsumoTipoInterface | null> {
        return await this.materialConsumoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: MaterialConsumoTipoInterface, idUser: User) {
        var object:MaterialConsumoTipoInterface = this.materialConsumoTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.materialConsumoTipoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tipo de material de consumo',
          tipo: 1,
          table: 'materiais_consumo_tipos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialConsumoTipoInterface, idUser: User) {
        var data: MaterialConsumoTipoInterface = await this.materialConsumoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.materialConsumoTipoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de material de consumo',
          tipo: 2,
          table: 'materiais_consumo_tipos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.materialConsumoTipoRepository.findOne({where: {
          id: id,
        }});
        await this.materialConsumoTipoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de material de consumo',
          tipo: 3,
          table: 'materiais_consumo_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
