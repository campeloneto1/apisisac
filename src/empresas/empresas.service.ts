import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Empresa as EmpresaEntity } from './empresa.entity';
import { Empresa as EmpresaInterface, Empresas as EmpresasInterface } from './empresa.interface';

@Injectable()
export class EmpresasService {
    constructor(
        @InjectRepository(EmpresaEntity)
        private empresaRepository: Repository<EmpresaEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<EmpresasInterface> {
      if(idUser.perfil.administrador){
        return await this.empresaRepository.find();
      }else{
        return await this.empresaRepository.find({
        where: {
          subunidade: {
            id: idUser.subunidade.id
          } 
        }
      });
      }
    }
  
      async find(id: number): Promise<EmpresaInterface | null> {
        return await this.empresaRepository.findOne({where: {id: id}});
      }
  
      async create(object: EmpresaInterface, idUser: User) {
        var object:EmpresaInterface = this.empresaRepository.create({...object, subunidade: idUser.subunidade, created_by: idUser}) 
        var save = await this.empresaRepository.save(object);     
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma empresa',
          tipo: 1,
          table: 'empresas',
          fk: save.id,
          user: idUser
        }); 
      }
  
      async update(id:number, object: EmpresaInterface, idUser: User) {
        var data: EmpresaInterface = await this.empresaRepository.findOneBy({id: id});
        
        data = {...object}
        await this.empresaRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma empresa',
          tipo: 2,
          table: 'empresas',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.empresaRepository.findOne({where: {
          id: id,
        }});
        await this.empresaRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um empresa',
          tipo: 3,
          table: 'empresas',
          fk: data.id,
          user: idUser
        });
      }
}
