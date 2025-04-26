"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeliveryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_delivery_dto_1 = require("./create-delivery.dto");
class UpdateDeliveryDto extends (0, mapped_types_1.PartialType)(create_delivery_dto_1.CreateDeliveryDto) {
}
exports.UpdateDeliveryDto = UpdateDeliveryDto;
//# sourceMappingURL=update-delivery.dto.js.map