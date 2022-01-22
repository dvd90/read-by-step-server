import { config } from 'dotenv';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from '../models/user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/app/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
