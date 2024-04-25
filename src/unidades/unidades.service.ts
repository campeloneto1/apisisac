import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidade as UnidadeEntity } from './unidade.entity';
import { Unidade as UnidadeInterface, Unidades as UnidadesInterface } from './unidade.interface';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';

@Injectable()
export class UnidadesService {
    constructor(
        @InjectRepository(UnidadeEntity)
        private unidadeRepository: Repository<UnidadeEntity>,
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
        console.log(object)
        var object:UnidadeInterface = this.unidadeRepository.create({...object, created_by: idUser}) 
        await this.unidadeRepository.save(object);      
      }
  
      async update(id:number, object: UnidadeInterface, idUser: User) {
        var data: UnidadeInterface = await this.unidadeRepository.findOneBy({id: id});
        
        data = {...object}
        await this.unidadeRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.unidadeRepository.delete(id);;
      }
}
