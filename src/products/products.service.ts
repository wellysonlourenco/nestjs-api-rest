import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/erros';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }


  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        ...createProductDto, quantity: 0
      },
    })
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.product.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundError(`Product with id ${id} not found`);
      }
    }
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prismaService.product.update({
        where: { id },
        data: updateProductDto
      });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

    }
  }

  async remove(id: number) {
    try {
      return await this.prismaService.product.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      if (error.code === 'P2025') {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

    }
  }
}
