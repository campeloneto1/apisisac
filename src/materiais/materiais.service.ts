import { Injectable } from '@nestjs/common';
import { Between, IsNull, LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Material as MaterialEntity } from './material.entity';
import { Material as MaterialInterface, Materiais as MateriaisInterface } from './material.interface';
import { format } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';

@Injectable()
export class MateriaisService {
    constructor(
        @InjectRepository(MaterialEntity)
        private materialRepository: Repository<MaterialEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<MateriaisInterface> {
        if(idUser.perfil.administrador){
          return await this.materialRepository.find();
        }else{
          return await this.materialRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async find(id: number, idUser: User): Promise<MaterialInterface | null> {
        return await this.materialRepository.findOne({
           relations:{
             materiais_policiais_itens: {
               material: false,
               material_policial: {
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

      async find2(id: number, idUser: User): Promise<MaterialInterface | null> {
        return await this.materialRepository.findOne({where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id
          }
        }});
      }
  
  
      async create(object: MaterialInterface, idUser: User) {
        var object:MaterialInterface = this.materialRepository.create({...object, quantidade_disponivel: object.quantidade, subunidade: idUser.subunidade, created_by: idUser}) 
        var save = await this.materialRepository.save(object);  
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Material',
          tipo: 1,
          table: 'materiais',
          fk: save.id,
          user: idUser
        });    
      }
  
      async update(id:number, object: MaterialInterface, idUser: User) {
        var data: MaterialInterface = await this.materialRepository.findOneBy({id: id});
        data = {...object, quantidade_disponivel: object.quantidade}
        await this.materialRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Material',
          tipo: 2,
          table: 'materiais',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.materialRepository.findOne({where: {
          id: id,
        }});
        await this.materialRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um material',
          tipo: 3,
          table: 'materiais',
          fk: data.id,
          user: idUser
        });
      }

      async disponiveis(idUser: User): Promise<MateriaisInterface> {
        if(idUser.perfil.administrador){
          return await this.materialRepository.find({where: {
            data_baixa: IsNull(),
            quantidade_disponivel: MoreThan(0),
          }});
        }else{
          return await this.materialRepository.find({where: {
            data_baixa: IsNull(),
            quantidade_disponivel: MoreThan(0),
            //@ts-ignore
            subunidade: idUser.subunidade.id
          }});
        }
      }

      async atualizarQuantidadeUp(id:number, quantidade:number):Promise<void>{
        var data: MaterialInterface = await this.materialRepository.findOneBy({id: id});
        data.quantidade_disponivel = data.quantidade_disponivel + quantidade;
        await this.materialRepository.update({id:id},{...data});
      }

      async atualizarQuantidadeDown(id:number, quantidade:number):Promise<void>{
        var data: MaterialInterface = await this.materialRepository.findOneBy({id: id});
        data.quantidade_disponivel = data.quantidade_disponivel - quantidade;
        await this.materialRepository.update({id:id},{...data});
      }

      async vencendo(idUser: User): Promise<MateriaisInterface> {
        let result = new Date();
        var proxsemana = result.setDate(result.getDate() + 30);

        if(idUser.perfil.administrador){
          return await this.materialRepository.find({where: {
            
            data_baixa: IsNull(),
            //@ts-ignore
            data_validade: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd'))
          }});
        }else{
          return await this.materialRepository.find({where: {
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

      async relatorio(object:any, idUser: User): Promise<MateriaisInterface> {
        var materiais;
        if(idUser.perfil.administrador){
          materiais =  await this.materialRepository.find({
            order: {
              serial: "ASC"
            }
          });
        }else{
          materiais = await this.materialRepository.find({
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
          materiais = materiais.filter(element => {
            return element.modelo.marca.id === object.marca
          })
        }

        if(object.modelo){
          materiais = materiais.filter(element => {
            return element.modelo.id === object.modelo
          })
        }

        if(object.material_tipo){
          materiais = materiais.filter(element => {
            return element.material_tipo.id === object.material_tipo
          })
        }

        if(object.data_baixa){
          materiais = materiais.filter(element => {
            return element.data_baixa !== null
          })
        }

        return materiais;
      }
}
