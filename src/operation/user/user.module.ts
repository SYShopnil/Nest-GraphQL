import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserResolver],
})
export class UserOperationModule {}
