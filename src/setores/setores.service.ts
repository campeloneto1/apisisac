import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Setor as SetorEntity } from './setor.entity';
import { Setor as SetorInterface, Setores as SetoresInterface } from './setor.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class SetoresService {
    constructor(
        @InjectRepository(SetorEntity)
        private setorRepository: Repository<SetorEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<SetoresInterface> {
        return await this.setorRepository.find();
      }
  
      async find(id: number): Promise<SetorInterface | null> {
        return await this.setorRepository.findOne({where: {id: id}});
      }
  
      async create(object: SetorInterface, idUser: User) {
        var object:SetorInterface = this.setorRepository.create({...object, created_by: idUser}) 
        await this.setorRepository.save(object);      
      }
  
      async update(id:number, object: SetorInterface, idUser: User) {
        var data: SetorInterface = await this.setorRepository.findOneBy({id: id});
        data = {...object}
        await this.setorRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.setorRepository.delete(id);;
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

      async policiaisSetor():Promise<any>{
        const photosSums = await this.setorRepository
          .createQueryBuilder("setores")
          .select("setores.nome")
          .addSelect("count(policiais.id)", "quant")
          .leftJoinAndSelect("setores.policiais", "policiais")
          .where("policiais.boletim_transferencia IS NULL")
          .groupBy("setores.nome")
          .addGroupBy("setores.id")
          .orderBy("setores.nome", "ASC")
          .getMany()
      }
}
