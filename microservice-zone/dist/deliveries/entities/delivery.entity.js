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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../../location/entities/location.entity");
const delivery_status_entity_1 = require("../../delivery-status/entities/delivery-status.entity");
let Delivery = class Delivery {
    id;
    address;
    personId;
    radius;
    status;
    location;
    constructor(id, address, personId, radius, status, location) {
        this.id = id;
        this.address = address;
        this.personId = personId;
        this.radius = radius;
        this.status = status;
        this.location = location;
    }
};
exports.Delivery = Delivery;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Delivery.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)("double precision"),
    __metadata("design:type", Number)
], Delivery.prototype, "radius", void 0);
__decorate([
    (0, typeorm_1.Column)(() => delivery_status_entity_1.DeliveryStatus),
    __metadata("design:type", delivery_status_entity_1.DeliveryStatus)
], Delivery.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(() => location_entity_1.Location),
    __metadata("design:type", location_entity_1.Location)
], Delivery.prototype, "location", void 0);
exports.Delivery = Delivery = __decorate([
    (0, typeorm_1.Entity)('deliveries'),
    __metadata("design:paramtypes", [Number, String, String, Number, delivery_status_entity_1.DeliveryStatus, location_entity_1.Location])
], Delivery);
//# sourceMappingURL=delivery.entity.js.map