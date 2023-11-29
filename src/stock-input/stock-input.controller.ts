import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStockInputDto } from './dto/create-stock-input.dto';
import { StockInputService } from './stock-input.service';

@Controller('stock-input')
export class StockInputController {
  constructor(private readonly stockInputService: StockInputService) { }

  @Post()
  create(@Body() createStockInputDto: CreateStockInputDto) {
    return this.stockInputService.create(createStockInputDto);
  }

  @Get()
  findAll() {
    return this.stockInputService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockInputService.findOne(+id);
  }

}