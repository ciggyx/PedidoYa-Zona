import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryStatusDto } from './create-delivery-status.dto';

export class UpdateDeliveryStatusDto extends PartialType(CreateDeliveryStatusDto) {}
