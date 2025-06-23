import { IsInt, Min } from 'class-validator';

export class UpdateStatusDto {
  @IsInt()
  @Min(1)
  statusId: number;
}
