import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { MaterialTipo as MaterialTipoEntity } from './material-tipo.entity';
import { MaterialTipo as MaterialTipoInterface, MateriaisTipos as MateriaisTiposInterface} from './material-tipo.interface';


@Injectable()
export class MateriaisTiposService {
    constructor(
        @InjectRepository(MaterialTipoEntity)
        private materialTipoRepository: Repository<MaterialTipoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<MateriaisTiposInterface> {
        return await this.materialTipoRepository.find();
      }
  
      async find(id: number): Promise<MaterialTipoInterface | null> {
        return await this.materialTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: MaterialTipoInterface, idUser: User) {
        var object:MaterialTipoInterface = this.materialTipoRepository.create({...object, created_by: idUser}) 
        var save = await this.materialTipoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um tipo de material',
          tipo: 1,
          table: 'materiais_tipos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialTipoInterface, idUser: User) {
        var data: MaterialTipoInterface = await this.materialTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.materialTipoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um tipo de material',
          tipo: 2,
          table: 'materiais_tipos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.materialTipoRepository.findOne({where: {
          id: id,
        }});
        await this.materialTipoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um tipo de material',
          tipo: 3,
          table: 'materiais_tipos',
          fk: data.id,
          user: idUser
        });
      }
}
