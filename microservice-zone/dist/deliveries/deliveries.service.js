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
exports.DeliveriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const delivery_entity_1 = require("./entities/delivery.entity");
const location_entity_1 = require("../location/entities/location.entity");
const delivery_status_entity_1 = require("../delivery-status/entities/delivery-status.entity");
let DeliveriesService = class DeliveriesService {
    deliveryRepository;
    locationRepository;
    deliveryStatusRepository;
    constructor(deliveryRepository, locationRepository, deliveryStatusRepository) {
        this.deliveryRepository = deliveryRepository;
        this.locationRepository = locationRepository;
        this.deliveryStatusRepository = deliveryStatusRepository;
    }
    async create(createDeliveryDto) {
        const { location, status, ...rest } = createDeliveryDto;
        const newLocation = this.locationRepository.create(location);
        await this.locationRepository.save(newLocation);
        const deliveryStatus = await this.deliveryStatusRepository.findOne({
            where: { name: status ?? 'available' },
        });
        if (!deliveryStatus) {
            throw new common_1.NotFoundException(`DeliveryStatus "${status ?? 'available'}" no encontrado`);
        }
        const delivery = this.deliveryRepository.create({
            ...rest,
            location: newLocation,
            status: deliveryStatus,
        });
        return await this.deliveryRepository.save(delivery);
    }
    findAll() {
        return this.deliveryRepository.find();
    }
    findOne(id) {
        return this.deliveryRepository.findOne({ where: { id } });
    }
    async update(id, updateDeliveryDto) {
        return this.findOne(id);
    }
    async remove(id) {
        await this.deliveryRepository.delete(id);
    }
};
exports.DeliveriesService = DeliveriesService;
exports.DeliveriesService = DeliveriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_entity_1.Delivery)),
    __param(1, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __param(2, (0, typeorm_1.InjectRepository)(delivery_status_entity_1.DeliveryStatus)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DeliveriesService);
//# sourceMappingURL=deliveries.service.js.map