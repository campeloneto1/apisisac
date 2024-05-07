import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidade as UnidadeEntity } from './unidade.entity';
import { Unidade as UnidadeInterface, Unidades as UnidadesInterface } from './unidade.interface';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class UnidadesService {
    constructor(
        @InjectRepository(UnidadeEntity)
        private unidadeRepository: Repository<UnidadeEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<UnidadesInterface> {
        return await this.unidadeRepository.find({
          relations: {
            comandante: {
              setor:false,
            },
            subcomandante: {
              setor: false,
            }
          }
        });
      }
  
      async find(id: number): Promise<UnidadeInterface | null> {
        return await this.unidadeRepository.findOne({where: {id: id}, relations: {
          comandante: {
            setor:false,
          },
          subcomandante: {
            setor: false,
          }
        }});
      }
  
      async create(object: UnidadeInterface, idUser: User) {
        var object:UnidadeInterface = this.unidadeRepository.create({...object, created_by: idUser}) 
        var save = await this.unidadeRepository.save(object);     
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um unidade',
          tipo: 1,
          table: 'unidades',
          fk: save.id,
          user: idUser
        }); 
      }
  
      async update(id:number, object: UnidadeInterface, idUser: User) {
        var data: UnidadeInterface = await this.unidadeRepository.findOneBy({id: id});
        
        data = {...object}
        await this.unidadeRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma unidade',
          tipo: 2,
          table: 'unidades',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.unidadeRepository.findOne({where: {
          id: id,
        }});
        await this.unidadeRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um unidade',
          tipo: 3,
          table: 'unidades',
          fk: data.id,
          user: idUser
        });
      }
}
