import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateStockInputsDto {
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: Date;
}