import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { MaterialPolicialItem as MaterialPolicialItemEntity } from './material-policial-item.entity';
import { MaterialPolicialItem as  MaterialPolicialItemInterface,MateriaisPoliciaisItens as MateriaisPoliciaisItensInterface} from './material-policial-item.interface';
import { LogsService } from 'src/logs/logs.service';
import { MateriaisService } from 'src/materiais/materiais.service';

@Injectable()
export class MateriaisPoliciaisItensService {
    constructor(
        @InjectRepository(MaterialPolicialItemEntity)
        private materialPolicialItemRepository: Repository<MaterialPolicialItemEntity>,
        private lazyModuleLoader: LazyModuleLoader,
        private logsService: LogsService,
        private materiaisService: MateriaisService
    ){}

    async index(): Promise<MateriaisPoliciaisItensInterface> {
        return await this.materialPolicialItemRepository.find();
      }
  
      async find(id: number): Promise<MaterialPolicialItemInterface | null> {
        return await this.materialPolicialItemRepository.findOne({where: {id: id}});
      }
  
      async create(objectreq: MaterialPolicialItemInterface, idUser: User) {
        var object:MaterialPolicialItemInterface = this.materialPolicialItemRepository.create({...objectreq, created_by: idUser}) 
        var save = await this.materialPolicialItemRepository.save(object);      

        //@ts-ignore
        this.materiaisService.atualizarQuantidadeDown(object.material, object.quantidade);

        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um item no emprestimo de material',
          tipo: 1,
          table: 'materiais_policiais_itens',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialPolicialItemInterface, idUser: User) {
        var data: MaterialPolicialItemInterface = await this.materialPolicialItemRepository.findOneBy({id: id});
        data = {...object}
        await this.materialPolicialItemRepository.update({id:id},{...data, updated_by: idUser});

      }
  
      async remove(id: number, idUser: User) {
        var object:MaterialPolicialItemInterface = await this.materialPolicialItemRepository.findOne({where: {id: id}});
        this.materiaisService.atualizarQuantidadeUp(object.material.id, object.quantidade);
        await this.materialPolicialItemRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(object),
          mensagem: 'Excluiu um item no emprestimo de material',
          tipo: 3,
          table: 'materiais_policiais_itens',
          fk: object.id,
          user: idUser
        });
      }

      async whereMatEmp(id:number): Promise<MateriaisPoliciaisItensInterface>{
        return await this.materialPolicialItemRepository.find({
          where: {
           material_policial: {
              id: id
            }
          }
        });
      }
}
