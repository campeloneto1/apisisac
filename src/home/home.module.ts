import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PoliciaisModule } from 'src/policiais/policiais.module';
import { PoliciaisAtestadosModule } from 'src/policiais-atestados/policiais-atestados.module';
import { PoliciaisFeriasModule } from 'src/policiais-ferias/policiais-ferias.module';
import { SetoresModule } from 'src/setores/setores.module';


@Module({
  imports: [
    PoliciaisModule,
    PoliciaisAtestadosModule,
    PoliciaisFeriasModule,
    SetoresModule
  ],
  providers: [HomeService],
  controllers: [HomeController],
  exports: [HomeService]
})
export class HomeModule {}
