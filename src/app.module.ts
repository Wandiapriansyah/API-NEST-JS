import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SiswaController } from './siswa/siswa.controller';
import { ConfigModule } from "@nestjs/config";
import ormConfig from "./config/orm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormConfigProd from "./config/orm.config.prod";
import { Siswa } from "./siswa/entities/siswa.entity";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
      process.env.NODE_ENV !== 'production' ? ormConfig: ormConfigProd,
    }),
    TypeOrmModule.forFeature([Siswa]),
    AuthModule,
    UsersModule,
    ],
  controllers: [AppController, SiswaController],
  providers: [AppService],
})

export class AppModule {}