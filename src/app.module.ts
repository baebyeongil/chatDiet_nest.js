import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';
import { TrainerController } from './trainer/trainer.controller';
import { TrainerService } from './trainer/trainer.service';
import { TrainerModule } from './trainer/trainer.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserInfoController } from './userInfo/userInfo.controller';
import { UserInfoService } from './userInfo/userInfo.service';
import { UserInfoModule } from './userInfo/userInfo.module';
import { ContractController } from './contract/contract.controller';
import { ContractService } from './contract/contract.service';
import { ContractModule } from './contract/contract.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigModule],
    }),
    CompanyModule,
    TrainerModule,
    UserModule,
    UserInfoModule,
    ContractModule,
  ],
  controllers: [
    AppController,
    CompanyController,
    TrainerController,
    UserController,
    UserInfoController,
    ContractController,
  ],
  providers: [
    AppService,
    CompanyService,
    TrainerService,
    UserService,
    UserInfoService,
    ContractService,
  ],
})
export class AppModule {}
