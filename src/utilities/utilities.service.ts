import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilitiesService {
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async generateSalt(length: number): Promise<string> {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async hashString(pass: string): Promise<string> {
    const saltRounds = 10;
    var passHash!: string;
    await bcrypt.hash(pass, saltRounds).then(function (hash) {
      passHash = hash;
    });
    return passHash;
  }

  async compareString(text: string, hash: string): Promise<boolean> {
    var response: boolean = false;
    await bcrypt.compare(text, hash).then(function (result) {
      response = result;
    });

    return response;
  }
}
