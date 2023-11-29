import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/erros';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockInputsDto } from './dto/create-stock-inputs.dto';

@Injectable()
export class StockInputsService {
  constructor(private prismaService: PrismaService) { }




  async create(createStockInputDto: CreateStockInputsDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: createStockInputDto.productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    //auto comit
    const result = await this.prismaService.$transaction([
      this.prismaService.stockInput.create({
        data: {
          productId: createStockInputDto.productId,
          quantity: createStockInputDto.quantity,
          date: createStockInputDto.date,
        },
      }),

      this.prismaService.product.update({
        where: { id: createStockInputDto.productId },
        data: {
          quantity: {
            increment: createStockInputDto.quantity,
          }
        },
      })
    ])

    return result[0];

  }

  async findAll() {
    return this.prismaService.stockInput.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.stockInput.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundError(`Stock Input with id ${id} not found`);
      }
    }
  }

}
