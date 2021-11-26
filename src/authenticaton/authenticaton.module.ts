import { Module } from '@nestjs/common';
import { AuthenticatonController } from './authenticaton.controller';
import { AuthenticatonService } from './authenticaton.service';

@Module({
  controllers: [AuthenticatonController],
  providers: [AuthenticatonService]
})
export class AuthenticatonModule {}
