import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/BlogDB')
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

