import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { Repository } from 'typeorm';
import { MaterialConsumoSaidaItem as MaterialConsumoSaidaItemEntity } from './material-consumo-saida-item.entity';
import { MaterialConsumoSaidaItem as MaterialConsumoSaidaItemInterface, MateriaisConsumoSaidasItens as MateriaisConsumoSaidasItensInterface } from './material-consumo-saida-item.interface';
import { MateriaisConsumoService } from 'src/materiais-consumo/materiais-consumo.service';
import { User } from 'src/users/user.interface';

@Injectable()
export class MateriaisConsumoSaidasItensService {
    constructor(
        @InjectRepository(MaterialConsumoSaidaItemEntity)
        private materialConsumoSaidaItemRepository: Repository<MaterialConsumoSaidaItemEntity>,
        private lazyModuleLoader: LazyModuleLoader,
        private logsService: LogsService,
        private materiaisConsumoService: MateriaisConsumoService
    ){}

    async index(): Promise<MateriaisConsumoSaidasItensInterface> {
        return await this.materialConsumoSaidaItemRepository.find();
      }
  
      async find(id: number): Promise<MaterialConsumoSaidaItemInterface | null> {
        return await this.materialConsumoSaidaItemRepository.findOne({where: {id: id}});
      }
  
      async create(objectreq: MaterialConsumoSaidaItemInterface, idUser: User) {
        var object:MaterialConsumoSaidaItemInterface = this.materialConsumoSaidaItemRepository.create({...objectreq, created_by: idUser}) 
        var save = await this.materialConsumoSaidaItemRepository.save(object);      

        //@ts-ignore
        this.armamentosService.atualizarQuantidadeDown(object.material_consumo, object.quantidade);

        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um item na saída de material de consumo',
          tipo: 1,
          table: 'materiais_consumo_saidas_itens',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialConsumoSaidaItemInterface, idUser: User) {
        var data: MaterialConsumoSaidaItemInterface = await this.materialConsumoSaidaItemRepository.findOneBy({id: id});
        data = {...object}
        await this.materialConsumoSaidaItemRepository.update({id:id},{...data, updated_by: idUser});

      }
  
      async remove(id: number, idUser: User) {
        var object:MaterialConsumoSaidaItemInterface = await this.materialConsumoSaidaItemRepository.findOne({where: {id: id}});
        this.materiaisConsumoService.atualizarQuantidadeUp(object.material_consumo.id, object.quantidade);
        await this.materialConsumoSaidaItemRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(object),
          mensagem: 'Excluiu um item na saída de material de consumo',
          tipo: 3,
          table: 'materiais_consumo_saidas_itens',
          fk: object.id,
          user: idUser
        });
      }

      async whereMatCon(id:number): Promise<MateriaisConsumoSaidasItensInterface>{
        return await this.materialConsumoSaidaItemRepository.find({
          where: {
            material_consumo: {
              id: id
            }
          }
        });
      }
}
