import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('products?')
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 15,
    @Query('name') name?: string,
  ) {
    const skip = (page - 1) * limit;

    let productsQuery = this.prisma.product.findMany({
      take: limit,
      skip,
      orderBy: {
        name: 'desc', // ordene conforme necessário
      },
    });

    let totalProductsQuery = this.prisma.product.count();

    if (name) {
      name = name.toLowerCase();
      productsQuery = this.prisma.product.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        take: limit,
        skip,
        orderBy: {
          name: 'desc', // ordene conforme necessário
        },
      });

      totalProductsQuery = this.prisma.product.count({
        where: {
          name: {
            contains: name,
          },
        },
      });
    }

    const [products, total] = await Promise.all([
      productsQuery,
      totalProductsQuery,
    ]);

    return {
      products,
      total,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  //HTTP 200 OK: Resposta padrão para HTTP bem-sucedido Solicitações. A resposta real será dependem do método de solicitação usado.
  //HTTP 204 sem conteúdo: O servidor processou a solicitação com êxito, mas não está retornando nenhum conteúdo

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
