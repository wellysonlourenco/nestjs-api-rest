import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StockInputModule } from './stock-input/stock-input.module';

@Module({
  imports: [ProductsModule, StockInputModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
