import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Subunidade as SubunidadeEntity } from './subunidade.entity';
import { Subunidade as SubunidadeInterface, Subunidades as SubunidadesInterface } from './subunidade.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class SubunidadesService {
    constructor(
        @InjectRepository(SubunidadeEntity)
        private subunidadeRepository: Repository<SubunidadeEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<SubunidadesInterface> {
        if(idUser.perfil.administrador){
          return await this.subunidadeRepository.find({relations: {
            comandante: {
              setor:false,
            },
            subcomandante: {
              setor: false,
            }
          }});
        }else{
          return await this.subunidadeRepository.find({relations: {
            comandante: {
              setor:false,
            },
            subcomandante: {
              setor: false,
            }
          },
          where: {
            id: params.subunidade
          }
        });
        }
      }
  
      async find(id: number): Promise<SubunidadeInterface | null> {
        return await this.subunidadeRepository.findOne({where: {id: id}, relations: {
          comandante: {
            setor:false,
          },
          subcomandante: {
            setor: false,
          }
        }});
      }
  
      async create(object: SubunidadeInterface, idUser: User) {
        var object:SubunidadeInterface = this.subunidadeRepository.create({...object, created_by: idUser}) 
        var save = await this.subunidadeRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma subunidade',
          tipo: 1,
          table: 'subunidades',
          fk: save.id,
          user: idUser
        });

      }
  
      async update(id:number, object: SubunidadeInterface, idUser: User) {
        var data: SubunidadeInterface = await this.subunidadeRepository.findOneBy({id: id});
        data = {...object}
        await this.subunidadeRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma subunidade',
          tipo: 2,
          table: 'subunidades',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.subunidadeRepository.findOne({where: {
          id: id,
        }});
        await this.subunidadeRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma subunidade',
          tipo: 3,
          table: 'subunidades',
          fk: data.id,
          user: idUser
        });
      }

      async whereUnidade(id: number, idUser: User): Promise<SubunidadesInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        if(idUser.perfil.administrador){
          return await this.subunidadeRepository.find({
            where: {
              unidade: {
                id: id,
              },
            },
          });
        }else{
          return await this.subunidadeRepository.find({
            where: {
              unidade: {
                id: id,
              },
              id: In(idsSubs)
            },
          });
        }
        
      }
}
