export class DeliveryResponseDto {
  id: number;
  personId: string;
  radius: number;
  location: {
    lat: number;
    lng: number;
  };
  status: {
    id: number;
    name: string;
  };
}
