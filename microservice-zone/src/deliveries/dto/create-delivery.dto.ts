import { IsString, MinLength, IsInt, IsPositive, MaxLength, IsIn, ValidateNested, IsOptional } from "class-validator";
import {Type} from "class-transformer";
import { CreateLocationDto } from "src/location/dto/create-location.dto";
export class CreateDeliveryDto {
// Esto la información que nosotros vamos a permitir que el cliente nos envíe hacia el controlador.
//También vamos a realizar las validaciones
  
  @IsInt()
  @IsPositive()
  @IsOptional()
  id?: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  address?: string;

  @IsString()
  @MinLength(3)
  personId: string;

  @IsInt()
  radius: number;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  @IsOptional()
  status?: string;

  //No se como validarlo la verdad
  @ValidateNested()
  //El type lo utilizamos para usar la clase CreateLocationDto que es un objeto anidado, osea es un objeto que usamos dentro de Delivery.
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;

}
