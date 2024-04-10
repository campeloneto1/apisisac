import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.interface';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private utilitiesService: UtilitiesService
      ) {}

  async signIn(username: string, senha: string): Promise<any> {
    const user: User = await this.usersService.signIn(username);

    if(user){
        const pass = `${senha}${user.salt}`;
        if(await this.utilitiesService.compareString(pass, user.password)){
           user.password = '';
           user.salt = '';
           
           const response = await this.jwtService.signAsync({...user});
           
           return {
                access_token: response,
                user: user
            };
           
           //return user;
        }else{
            throw new UnauthorizedException();
        }
    }else{
        throw new UnauthorizedException();
    }
  }
}
