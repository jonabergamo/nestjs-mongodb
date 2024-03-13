import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { usersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs_teste'),
    usersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
