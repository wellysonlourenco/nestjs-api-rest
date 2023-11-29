import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/erros';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';

@Injectable()
export class StockOutputsService {
  constructor(private prismaService: PrismaService) { }




  async create(createStockOutputDto: CreateStockOutputDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: createStockOutputDto.productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.quantity === 0) {
      throw new Error('Product out of stock');
    }

    if (createStockOutputDto.quantity > product.quantity) {
      throw new Error('Insufficient product quantity');
    }

    //auto comit
    const result = await this.prismaService.$transaction([
      this.prismaService.stockInput.create({
        data: {
          productId: createStockOutputDto.productId,
          quantity: createStockOutputDto.quantity,
          date: createStockOutputDto.date,
        },
      }),

      this.prismaService.product.update({
        where: { id: createStockOutputDto.productId },
        data: {
          quantity: {
            decrement: createStockOutputDto.quantity,
          }
        },
      })
    ])

    return result[0];

  }

  async findAll() {
    return this.prismaService.stockOutput.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.stockOutput.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundError(`Stock Output with id ${id} not found`);
      }
    }
  }


}
