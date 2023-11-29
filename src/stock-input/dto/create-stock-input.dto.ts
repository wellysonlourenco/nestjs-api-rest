import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateStockInputDto {
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    @IsDateString()
    date: string;
}