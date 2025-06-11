import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DeliveryStatusService } from './delivery-status.service';
import { CreateDeliveryStatusDto } from './dto/create-delivery-status.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('delivery-status')
@UseGuards(AuthGuard)
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Post()
  @Permissions(['createDeliveryStatus'])
  create(@Body() createDeliveryStatusDto: CreateDeliveryStatusDto) {
    return this.deliveryStatusService.create(createDeliveryStatusDto);
  }

  @Get()
  @Permissions(['getStatuses'])
  findAll() {
    return this.deliveryStatusService.findAll();
  }

  @Get(':id')
  @Permissions(['getStatus'])
  findOne(@Param('id') id: string) {
    return this.deliveryStatusService.findOne(+id);
  }

  @Patch(':id')
  @Permissions(['updateStatus'])
  update(
    @Param('id') id: string,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    return this.deliveryStatusService.update(+id, updateDeliveryStatusDto);
  }

  @Delete(':id')
  @Permissions(['deleteStatus'])
  remove(@Param('id') id: string) {
    return this.deliveryStatusService.remove(+id);
  }
}
