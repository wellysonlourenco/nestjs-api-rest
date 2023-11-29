import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StockInputsModule } from './stock-input/stock-inputs.module';
import { StockOutputsModule } from './stock-outputs/stock-outputs.module';

@Module({
  imports: [ProductsModule, StockInputsModule, StockOutputsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
