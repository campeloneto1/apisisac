import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User as UserEntity } from './user.entity';
import { User as UserInterface, Users as UsersInterface } from './user.interface';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { LogsService } from 'src/logs/logs.service';
import { UsersSubunidadesService } from 'src/users-subunidades/users-subunidades.service';

@Injectable()
export class UsersService {
   
    constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      private utilitiesService: UtilitiesService,
      private usersSubunidadesService: UsersSubunidadesService,
      private logsService: LogsService,
      private lazyModuleLoader: LazyModuleLoader
    ) {}

    async index(params:any, idUser: UserInterface): Promise<UsersInterface> {
      if(idUser.perfil.administrador){
        return await this.usersRepository.find({
          relations: {
            users_subunidades: {
              subunidade: {
                unidade: true
              }
            }
          }
        });
      }else{
        return await this.usersRepository.find({
          relations: {
            users_subunidades: {
              subunidade: {
                unidade: true
              }
            }
          },
          where: {
            users_subunidades: {
              subunidade: In([params.subunidade])
            }
          }
        });
      }
      
    }

    async find(id: number): Promise<UserInterface | null> {
      return await this.usersRepository.findOne({
        relations: {
          users_subunidades: {
            subunidade: {
              unidade: true
            }
          }
        },
        where: {id: id}
      });
    }

    async wherePol(id: number): Promise<UserInterface | null> {
      return await this.usersRepository.findOne({
        relations: {
          users_subunidades: {
            subunidade: {
              unidade: true
            }
          }
        },
        where: {policial:{
          id: id
        }}
      });
    }

    async wherePol2(id: number): Promise<UserInterface | null> {
      return await this.usersRepository.findOne({
        
        where: {policial:{
          id: id
        }}
      });
    }

    async create(object: UserInterface, idUser: UserInterface) {
      object.salt = await this.utilitiesService.generateSalt(10);
      object.password = await this.utilitiesService.hashString(`${object.cpf}${object.salt}`);

      var object:UserInterface = this.usersRepository.create({...object, created_by: idUser}) 
      var save = await this.usersRepository.save(object);      

      this.usersSubunidadesService.create({
        //@ts-ignore
        user: save.id,
        subunidade: object.subunidade
      },
      idUser);

      await this.logsService.create({
        object: JSON.stringify(save),
        mensagem: 'Cadastrou um usuário',
        tipo: 1,
        table: 'users',
        fk: save.id,
        user: idUser
      });


    }

    async update(id:number, object: UserInterface, idUser: UserInterface) {
      var data: UserInterface = await this.usersRepository.findOneBy({id: id});
      data = {...object}
      await this.usersRepository.update({id:id},{...data, updated_by: idUser});
      await this.logsService.create({
        object: JSON.stringify(object),
        object_old: JSON.stringify(data),
        mensagem: 'Editou um usuário',
        tipo: 2,
        table: 'users',
        fk: id,
        user: idUser
      });
    }

    async remove(id: number, idUser: UserInterface) {
      var data = await this.usersRepository.findOne({where: {
        id: id,
      }});
      await this.usersRepository.delete(id);
      await this.logsService.create({
        object: JSON.stringify(data),
        mensagem: 'Excluiu um usuário',
        tipo: 3,
        table: 'users',
        fk: data.id,
        user: idUser
      });
    }

    async signIn(username: string): Promise<UserInterface> {
      const user: UserInterface = await this.usersRepository.findOne({
          where: {
            cpf: username,
          }, 
          select: {
              id: true,
              nome: true,
              cpf: true,
              password: true,
              salt:true,
          },
          relations: {
            perfil: true,
            users_subunidades: {
              subunidade: {
                unidade: true
              }
            }
          }
      });
      return user;
    }

    async resetPass(object:UserInterface, idUser: UserInterface){
      var user = await this.usersRepository.findOne({where: {id: object.id}});
      user.salt = await this.utilitiesService.generateSalt(10);
      user.password = await this.utilitiesService.hashString(`${user.cpf}${user.salt}`);
      var update = await this.usersRepository.update({id:object.id},{...user});
      await this.logsService.create({
        object: JSON.stringify(update),
        object_old: JSON.stringify(user),
        mensagem: 'Resetou a senha de um usuário',
        tipo: 2,
        table: 'users',
        fk: object.id,
        user: idUser
      });
    }

    async changePass(object:any){
      var user = await this.usersRepository.findOne({where: {id: object.id}});
      user.salt = await this.utilitiesService.generateSalt(10);
      user.password = await this.utilitiesService.hashString(`${object.password}${user.salt}`);
      var update = await this.usersRepository.update({id:object.id},{...user});
    }
}
/*
 policial: {
              boletim_transferencia: IsNull()
            }*/