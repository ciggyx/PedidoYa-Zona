"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryStatusDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_delivery_status_dto_1 = require("./create-delivery-status.dto");
class UpdateDeliveryStatusDto extends (0, mapped_types_1.PartialType)(create_delivery_status_dto_1.CreateDeliveryStatusDto) {
}
exports.UpdateDeliveryStatusDto = UpdateDeliveryStatusDto;
//# sourceMappingURL=update-delivery-status.dto.js.map