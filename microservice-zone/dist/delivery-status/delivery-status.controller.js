"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatusController = void 0;
const common_1 = require("@nestjs/common");
const delivery_status_service_1 = require("./delivery-status.service");
const create_delivery_status_dto_1 = require("./dto/create-delivery-status.dto");
const update_delivery_status_dto_1 = require("./dto/update-delivery-status.dto");
let DeliveryStatusController = class DeliveryStatusController {
    deliveryStatusService;
    constructor(deliveryStatusService) {
        this.deliveryStatusService = deliveryStatusService;
    }
    create(createDeliveryStatusDto) {
        return this.deliveryStatusService.create(createDeliveryStatusDto);
    }
    findAll() {
        return this.deliveryStatusService.findAll();
    }
    findOne(id) {
        return this.deliveryStatusService.findOne(+id);
    }
    update(id, updateDeliveryStatusDto) {
        return this.deliveryStatusService.update(+id, updateDeliveryStatusDto);
    }
    remove(id) {
        return this.deliveryStatusService.remove(+id);
    }
};
exports.DeliveryStatusController = DeliveryStatusController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_delivery_status_dto_1.CreateDeliveryStatusDto]),
    __metadata("design:returntype", void 0)
], DeliveryStatusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeliveryStatusController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeliveryStatusController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_delivery_status_dto_1.UpdateDeliveryStatusDto]),
    __metadata("design:returntype", void 0)
], DeliveryStatusController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeliveryStatusController.prototype, "remove", null);
exports.DeliveryStatusController = DeliveryStatusController = __decorate([
    (0, common_1.Controller)('delivery-status'),
    __metadata("design:paramtypes", [delivery_status_service_1.DeliveryStatusService])
], DeliveryStatusController);
//# sourceMappingURL=delivery-status.controller.js.map