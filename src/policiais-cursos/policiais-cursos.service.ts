import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { In, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PolicialCurso as PolicialCursoEntity } from './policial-curso.entity';
import { PolicialCurso as PolicialCursoInterface, PoliciaisCursos as PoliciaisCursosInterface } from './policial-curso.interface';
import { LogsService } from 'src/logs/logs.service';
import { format } from 'date-fns';

@Injectable()
export class PoliciaisCursosService {
    constructor(
        @InjectRepository(PolicialCursoEntity)
        private policialCursoRepository: Repository<PolicialCursoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<PoliciaisCursosInterface> {
      
          return await this.policialCursoRepository.find({
            relations: {
              policial: {
                graduacao: true,
                setor: {
                  subunidade: {
                    unidade: true
                  }
                }
              }
            },
            where: {
              //@ts-ignore
              policial: {
                setor: {
                  subunidade: {
                    id: params.subunidade
                  }
                }
              }
            }
          });
        
      }
  
      async find(id: number, idUser: User): Promise<PolicialCursoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.policialCursoRepository.findOne({
          relations: {
            policial: {
              graduacao: true,
              setor: {
                subunidade: {
                  unidade: true
                }
              }
            }
          },
          where: {
            id: id,
            //@ts-ignore
            policial: {
              setor: {
                subunidade: {
                  id: In(idsSubs)
                }
              }
            }
          }
        });
      }
  
      async create(object: PolicialCursoInterface, idUser: User) {
        var object:PolicialCursoInterface = this.policialCursoRepository.create({...object, created_by: idUser}) 
        var save = await this.policialCursoRepository.save(object);      

        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Curso de Policial',
          tipo: 1,
          table: 'policiais_cursos',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PolicialCursoInterface, idUser: User) {
        var data: PolicialCursoInterface = await this.policialCursoRepository.findOneBy({id: id});
        data = {...object}
        await this.policialCursoRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Curso de Policial',
          tipo: 2,
          table: 'policiais_cursos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.policialCursoRepository.findOne({where: {
          id: id,
        }});
        await this.policialCursoRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um Curso de Policial',
          tipo: 3,
          table: 'policiais_cursos',
          fk: data.id,
          user: idUser
        });
      }

      async quantidade(params:any,idUser: User): Promise<number> {
        return await this.policialCursoRepository.count({where: [
          {
            //@ts-ignore
            data_inicial: LessThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
            //@ts-ignore
            data_final: MoreThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
            //@ts-ignore
            policial: {
              setor: {
                subunidade: {
                  id: params.subunidade
                }
              }
            }
          },
          {
            //@ts-ignore
            data_final: IsNull(),
            //@ts-ignore
            policial: {
              setor: {
                subunidade: {
                  id: params.subunidade
                }
              }
            }
          }
        ]
        });
      }

      async wherePolicial(id: number, idUser: User): Promise<PoliciaisCursosInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.policialCursoRepository.find({
         
          where: {
            
            //@ts-ignore
            policial: {
              id: id,
              setor: {
                subunidade: {
                  id: In(idsSubs)
                }
              }
            }
          }
        });
      }

      async relatorio(object:any, idUser: User): Promise<PoliciaisCursosInterface> {
        var hoje = new Date();
         
        var policiais;
  
        policiais = await this.policialCursoRepository.find({
          relations: {
            policial: {
              graduacao: true,
              setor: {
                subunidade: {
                  unidade: true
                }
              }
            }
          },
          where: {
            policial: {
              setor: {
                subunidade: {
                  id: object.subunidade
                }
              }
            }
          },
        });
  
         if(object.policial){
           policiais = policiais.filter(element => {
             return element.policial.id === object.policial;
           })
         }
    
         if(object.setor){
           policiais = policiais.filter(element => {
             return element.policial.setor.id === object.setor;
           })
         }
    
         if(object.graduacao){
           policiais = policiais.filter(element => {
             return element.policial.graduacao.id === object.graduacao;
           })
         }

         if(object.curso){
          policiais = policiais.filter(element => {
            return element.curso.id === object.curso;
          })
        }
  
         if(object.vigente){
          policiais = policiais.filter(element => {
            return (new Date(element.data_inicial) <= hoje && new Date(element.data_final) >= hoje) || element.data_final == null ;
          });
        }
  
        return policiais;
      }
}
