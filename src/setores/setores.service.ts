import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Setor as SetorEntity } from './setor.entity';
import { Setor as SetorInterface, Setores as SetoresInterface } from './setor.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class SetoresService {
    constructor(
        @InjectRepository(SetorEntity)
        private setorRepository: Repository<SetorEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<SetoresInterface> {
        
        if(idUser.perfil.administrador){
          return await this.setorRepository.find();
        }else{
          return await this.setorRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async find(id: number): Promise<SetorInterface | null> {
        return await this.setorRepository.findOne({where: {id: id}});
      }
  
      async create(object: SetorInterface, idUser: User) {
        var object:SetorInterface = this.setorRepository.create({...object, created_by: idUser}) 
        var save = await this.setorRepository.save(object);     
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um setor',
          tipo: 1,
          table: 'setores',
          fk: save.id,
          user: idUser
        }); 
      }
  
      async update(id:number, object: SetorInterface, idUser: User) {
        var data: SetorInterface = await this.setorRepository.findOneBy({id: id});
        data = {...object}
        await this.setorRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um setor',
          tipo: 2,
          table: 'setores',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.setorRepository.findOne({where: {
          id: id,
        }});
        await this.setorRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um setor',
          tipo: 3,
          table: 'setores',
          fk: data.id,
          user: idUser
        });
      }

      async whereSubunidade(id: number): Promise<SetoresInterface | null> {
        return await this.setorRepository.find({
          where: {
            subunidade: {
              id: id,
            },
          },
        });
      }

      async policiaisSetor(idUser: User):Promise<any>{
        return await this.setorRepository
          .query(`
            SELECT setores.nome, count(policiais.id) as quantidade
            FROM setores
            LEFT JOIN policiais ON setores.id = policiais.setorId
            WHERE policiais.boletim_transferencia IS NULL
            AND setores.subunidadeId = ${idUser.subunidade.id}
            GROUP BY setores.nome
            ORDER BY setores.nome
          `);
      }
}
