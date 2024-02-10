import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { TrainerModule } from './trainer/trainer.module';
import { UserModule } from './user/user.module';
import { UserInfoModule } from './userInfo/userInfo.module';
import { ContractModule } from './contract/contract.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from 'auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    CompanyModule,
    TrainerModule,
    UserModule,
    UserInfoModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/user/update', method: RequestMethod.PUT });
  }
}
