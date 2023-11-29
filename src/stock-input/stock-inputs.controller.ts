import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateStockInputsDto } from './dto/create-stock-inputs.dto';
import { StockInputsService } from './stock-inputs.service';

@Controller('stock-inputs')
export class StockInputsController {
  constructor(private readonly stockInputService: StockInputsService) { }

  @Post()
  create(@Body() createStockInputsDto: CreateStockInputsDto) {
    return this.stockInputService.create(createStockInputsDto);
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