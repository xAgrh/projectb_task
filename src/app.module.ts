import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import nodemailer from './config/nodemailer';
import database from './config/database';
import { BullModule } from '@nestjs/bull';
import { EmailsModule } from './emails-handling/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'),
      isGlobal: true,
      load: [database, nodemailer],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('database.mongoConnectionString'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('nodemailer');
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('redis');
      },
      inject: [ConfigService],
    }),
    EmployeesModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
