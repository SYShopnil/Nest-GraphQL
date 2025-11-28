import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserOperationModule } from './operation/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, //denote that code first approach
      debug: true,
      playground: true,
    }),
    UserModule,
    PostModule,
    UserOperationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
