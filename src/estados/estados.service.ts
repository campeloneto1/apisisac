import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado as EstadoEntity} from './estado.entity';
import { Estado as EstadoInterface, Estados as EstadosInterface } from './estado.interface';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';

@Injectable()
export class EstadosService {
    constructor(
        @InjectRepository(EstadoEntity)
        private estadoRepository: Repository<EstadoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<EstadosInterface> {
        return await this.estadoRepository.find();
      }
  
      async find(id: number): Promise<EstadoInterface | null> {
        return await this.estadoRepository.findOne({where: {id: id}});
      }
  
      async create(object: EstadoInterface, idUser: User) {
        var object:EstadoInterface = this.estadoRepository.create({...object, created_by: idUser}) 
        await this.estadoRepository.save(object);      
      }
  
      async update(id:number, object: EstadoInterface, idUser: User) {
        var data: EstadoInterface = await this.estadoRepository.findOneBy({id: id});
        data = {...object}
        await this.estadoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.estadoRepository.delete(id);;
      }
}
