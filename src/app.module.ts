import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Web3Module } from './web3/web3.module';
import { Transaction } from './common/entities/transaction.entity';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'limit',
        ttl: 6000,
        limit: 10,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'db_name',
      entities: [Transaction],
      synchronize: true, 
    }),

    Web3Module,
  ],
})
export class AppModule {}
