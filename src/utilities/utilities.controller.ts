import {
  Body,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UtilitiesService } from './utilities.service';

@Controller('utilities')
export class UtilitiesController {

  @UseInterceptors(FileInterceptor(
    'file', {
      storage: diskStorage({
        destination: 'public/img',
        filename: (req, file, cb) => {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let result = "";
          for (let i = 0; i < 80; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          var split = file.originalname.split('.');
          cb(null, `${result}.${split[1]}`);
        },
      }),
    }
  ))
  @Post('upload')
  uploadFile(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png|jpg|jpeg|gif',
        })
        .build({
          fileIsRequired: true,
        }),
    )
    file: Express.Multer.File,
  ) {
    
    return {
      statusCode: 200,
      data: file.path,
    };
  }
  
}
