import {IsNotEmpty, IsString, IsInt} from 'class-validator'
export class CreateDeliveryStatusDto {
   @IsString()
   @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    id: number;


}
