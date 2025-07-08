import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produtos/produto.module';
import { Produto } from './produtos/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmaciaapi',
      entities: [Produto],
      synchronize: true,
    }),
    ProdutoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
