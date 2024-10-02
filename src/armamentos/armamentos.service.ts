import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, In, IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Armamento as ArmamentoEntity } from './armamento.entity';
import { Armamento as ArmamentoInterface, Armamentos as ArmamentosInterface } from './armamento.interface';
import { format } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ArmamentosService {
    constructor(
        @InjectRepository(ArmamentoEntity)
        private armamentoRepository: Repository<ArmamentoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any, idUser: User): Promise<ArmamentosInterface> {
        
          return await this.armamentoRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: params.subunidade
              }
            }
          });
        
      }
  
      async find(id: number, idUser: User): Promise<ArmamentoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.armamentoRepository.findOne({
          relations:{
            armamentos_emprestimos_itens: {
              armamento: false,
              armamento_emprestimo: {
                policial: {
                  graduacao: true
                }
              }
            }
          },
          where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: In(idsSubs)
          }
        }});
      }

      async find2(id: number, idUser: User): Promise<ArmamentoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.armamentoRepository.findOne({where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: In(idsSubs)
          }
        }});
      }
  
  
      async create(object: ArmamentoInterface, idUser: User) {
        var object:ArmamentoInterface = this.armamentoRepository.create({...object, quantidade_disponivel: object.quantidade, created_by: idUser}) 
        var save = await this.armamentoRepository.save(object);  
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Armamento',
          tipo: 1,
          table: 'armamentos',
          fk: save.id,
          user: idUser
        });    
      }
  
      async update(id:number, object: ArmamentoInterface, idUser: User) {
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Armamento',
          tipo: 2,
          table: 'armamentos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.armamentoRepository.findOne({where: {
          id: id,
        }});
        await this.armamentoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um Armamento',
          tipo: 3,
          table: 'armamentos',
          fk: data.id,
          user: idUser
        });
      }

      async disponiveis(params:any, idUser: User): Promise<ArmamentosInterface> {
       
          return await this.armamentoRepository.find({where: {
            data_baixa: IsNull(),
            quantidade_disponivel: MoreThan(0),
            //@ts-ignore
            subunidade: {
              id: params.subunidade
            }
          }});
        
      }

      async atualizarQuantidadeUp(id:number, quantidade:number):Promise<void>{
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        data.quantidade_disponivel = data.quantidade_disponivel + quantidade;
        await this.armamentoRepository.update({id:id},{...data});
      }

      async atualizarQuantidadeDown(id:number, quantidade:number):Promise<void>{
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        data.quantidade_disponivel = data.quantidade_disponivel - quantidade;
        await this.armamentoRepository.update({id:id},{...data});
      }

      async vencendo(params:any, idUser: User): Promise<ArmamentosInterface> {
        let result = new Date();
        var proxsemana = result.setDate(result.getDate() + 30);

        
          return await this.armamentoRepository.find({where: {
            //@ts-ignore
            subunidade: {
              id: params.subunidade
            },
            data_baixa: IsNull(),
            //@ts-ignore
            data_validade: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd'))
          }});
        
      }

      async ajustarquant(id:number, object: any, idUser: User) {
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        if(object.tipo == 1){
          data.quantidade = Number(data.quantidade) + Number(object.quantidade);
          data.quantidade_disponivel = Number(data.quantidade_disponivel) + Number(object.quantidade);
        }else{
          data.quantidade = Number(data.quantidade) - Number(object.quantidade);
          data.quantidade_disponivel = Number(data.quantidade_disponivel) - Number(object.quantidade);
        }
        
        await this.armamentoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Ajustou a quantidade um Armamento',
          tipo: 2,
          table: 'armamentos',
          fk: id,
          user: idUser
        });
      }

      async ajustarquant2(id:number, object: any, idUser: User) {
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        
          data.quantidade = Number(object.quantidade);
          data.quantidade_disponivel = Number(object.quantidade_disponivel);
      
        await this.armamentoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Ajustou a quantidade um Armamento',
          tipo: 2,
          table: 'armamentos',
          fk: id,
          user: idUser
        });
      }

      async quantPorModelo(params:any, idUser: User): Promise<ArmamentosInterface> {
          return await this.armamentoRepository.createQueryBuilder('armamentos')
          .leftJoinAndSelect('armamentos.modelo', 'modelos')
          .leftJoinAndSelect('modelos.marca', 'marcas')
          .leftJoinAndSelect('armamentos.armamento_tipo', 'armamentos_tipos')
          .leftJoinAndSelect('armamentos.armamento_calibre', 'armamentos_calibres')
          .leftJoinAndSelect('armamentos.armamento_tamanho', 'armamentos_tamanhos')
          .where('armamentos.subunidadeId = :subunidadeId', { subunidadeId: params.subunidade })
          .andWhere('armamentos.data_baixa IS NULL')
          .groupBy('marcas.nome')
          .addGroupBy('modelos.nome')
          .addGroupBy('armamento_tipos.nome')
          .addGroupBy('armamento_calibres.nome')
          .addGroupBy('armamento_tamanhos.nome')
          .select([
            'marcas.nome AS marcaNome',
            'modelos.nome AS modeloNome',
            'armamentos_tipos.nome AS armamentoTipoNome',
            'armamentos_calibres.nome AS armamentoCalibreNome',
            'armamentos_tamanhos.nome AS armamentoTamanhoNome',
            'COUNT(armamentos.id) AS armamentoCount'
          ])
          .getRawMany();
        
      }

      async relatorio(object:any, idUser: User): Promise<ArmamentosInterface> {
        var armas;
        
          armas = await this.armamentoRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: object.subunidade
              }
            },
            order: {
              serial: "ASC"
            }
          });
        

        if(object.marca){
          armas = armas.filter(element => {
            return element.modelo.marca.id === object.marca
          });
        }

        if(object.modelo){
          armas = armas.filter(element => {
            return element.modelo.id === object.modelo
          });
        }

        if(object.armamento_tipo){
          armas = armas.filter(element => {
            return element.armamento_tipo.id === object.armamento_tipo
          });
        }

        if(object.armamento_calibre){
          armas = armas.filter(element => {
            if(element.armamento_calibre){
              return element.armamento_calibre.id === object.armamento_calibre
            }
          });
        }

        if(object.armamento_tamanho){
          armas = armas.filter(element => {
            if(element.armamento_tamanho){
              return element.armamento_tamanho.id === object.armamento_tamanho
            }
          });
        }

        if(object.data_baixa){
          armas = armas.filter(element => {
            return element.data_baixa !== null
          });
        }else{
          armas = armas.filter(element => {
            return element.data_baixa === null
          });
        }

        return armas;
      }
}
