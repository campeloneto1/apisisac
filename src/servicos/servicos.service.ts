import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { Servico as ServicoEntity } from './servico.entity';
import { Servico as ServicoInterface, Servicos as ServicosInterface } from './servico.interface';

@Injectable()
export class ServicosService {
    constructor(
        @InjectRepository(ServicoEntity)
        private servicoRepository: Repository<ServicoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<ServicosInterface> {
     
        return await this.servicoRepository.find({
          
            where: {
                subunidade: {
                    id: params.subunidade
                }
            }
        });
      
    }
  
      async find(id: number, idUser:User): Promise<ServicoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.servicoRepository.findOne({
          
          where: {
            id: id,
            subunidade: {
              id: In(idsSubs)
            }
          }
        });
      }
  
      async create(object: ServicoInterface, idUser: User) {
        var object:ServicoInterface = this.servicoRepository.create({...object, created_by: idUser}) 
        var save = await this.servicoRepository.save(object);     
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um serviço',
          tipo: 1,
          table: 'servicos',
          fk: save.id,
          user: idUser
        }); 
      }
  
      async update(id:number, object: ServicoInterface, idUser: User) {
        var data: ServicoInterface = await this.servicoRepository.findOneBy({id: id});
        
        data = {...object}
        await this.servicoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma serviço',
          tipo: 2,
          table: 'servicos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.servicoRepository.findOne({where: {
          id: id,
        }});
        await this.servicoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um serviço',
          tipo: 3,
          table: 'servicos',
          fk: data.id,
          user: idUser
        });
      }
}
