import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;


    @IsPositive()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    price: number;
}
