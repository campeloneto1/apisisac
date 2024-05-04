import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Armamento as ArmamentoEntity } from './armamento.entity';
import { Armamento as ArmamentoInterface, Armamentos as ArmamentosInterface } from './armamento.interface';
import { format } from 'date-fns';

@Injectable()
export class ArmamentosService {
    constructor(
        @InjectRepository(ArmamentoEntity)
        private armamentoRepository: Repository<ArmamentoEntity>,
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
        var object:ArmamentoInterface = this.armamentoRepository.create({...object, quantidade_disponivel: object.quantidade, subunidade: idUser.subunidade, created_by: idUser}) 
        await this.armamentoRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoInterface, idUser: User) {
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        data = {...object, quantidade_disponivel: object.quantidade}
        await this.armamentoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoRepository.delete(id);;
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
            subunidade: idUser.subunidade.id
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
}
