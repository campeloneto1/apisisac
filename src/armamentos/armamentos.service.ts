import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
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

    async index(idUser: User): Promise<ArmamentosInterface> {
        if(idUser.perfil.administrador){
          return await this.armamentoRepository.find();
        }else{
          return await this.armamentoRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async find(id: number, idUser: User): Promise<ArmamentoInterface | null> {
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
            id: idUser.subunidade.id
          }
        }});
      }

      async find2(id: number, idUser: User): Promise<ArmamentoInterface | null> {
        return await this.armamentoRepository.findOne({where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id
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

      async disponiveis(idUser: User): Promise<ArmamentosInterface> {
        if(idUser.perfil.administrador){
          return await this.armamentoRepository.find({where: {
            data_baixa: IsNull(),
            quantidade_disponivel: MoreThan(0),
          }});
        }else{
          return await this.armamentoRepository.find({where: {
            data_baixa: IsNull(),
            quantidade_disponivel: MoreThan(0),
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }});
        }
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

      async vencendo(idUser: User): Promise<ArmamentosInterface> {
        let result = new Date();
        var proxsemana = result.setDate(result.getDate() + 30);

        if(idUser.perfil.administrador){
          return await this.armamentoRepository.find({where: {
            
            data_baixa: IsNull(),
            //@ts-ignore
            data_validade: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd'))
          }});
        }else{
          return await this.armamentoRepository.find({where: {
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            },
            data_baixa: IsNull(),
            //@ts-ignore
            data_validade: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd'))
          }});
        }
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

      async relatorio(object:any, idUser: User): Promise<ArmamentosInterface> {
        var armas;
        if(idUser.perfil.administrador){
          armas =  await this.armamentoRepository.find({
            order: {
              serial: "ASC"
            }
          });
        }else{
          armas = await this.armamentoRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            order: {
              serial: "ASC"
            }
          });
        }

        if(object.marca){
          armas = armas.filter(element => {
            return element.modelo.marca.id === object.marca
          })
        }

        if(object.modelo){
          armas = armas.filter(element => {
            return element.modelo.id === object.modelo
          })
        }

        if(object.armamento_tipo){
          armas = armas.filter(element => {
            return element.armamento_tipo.id === object.armamento_tipo
          })
        }

        if(object.armamento_calibre){
          armas = armas.filter(element => {
            if(element.armamento_calibre){
              return element.armamento_calibre.id === object.armamento_calibre
            }
          })
        }

        if(object.armamento_tamanho){
          armas = armas.filter(element => {
            if(element.armamento_tamanho){
              return element.armamento_tamanho.id === object.armamento_tamanho
            }
          })
        }

        if(object.data_baixa){
          armas = armas.filter(element => {
            return element.data_baixa !== null
          })
        }

        return armas;
      }
}
