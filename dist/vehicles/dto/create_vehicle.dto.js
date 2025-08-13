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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const vehicle_entity_1 = require("../entities/vehicle.entity");
class CreateVehicleDto {
    constructor() {
        this.tipoCabina = vehicle_entity_1.TipoCabina.SIMPLE;
        this.esExterno = false;
        this.estado = 'ACTIVO';
    }
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La placa del vehículo es requerida' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "placa", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La marca del vehículo es requerida' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "marca", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El modelo del vehículo es requerido' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "modelo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900, { message: 'El año debe ser válido' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "anio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "numeroInterno", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vehicle_entity_1.TipoCabina, { message: 'El tipo de cabina debe ser simple o doble' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "tipoCabina", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'La fecha debe tener formato YYYY-MM-DD',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "fechaVencimientoVTV", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'La fecha debe tener formato YYYY-MM-DD',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "fechaVencimientoSeguro", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateVehicleDto.prototype, "esExterno", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "estado", void 0);
//# sourceMappingURL=create_vehicle.dto.js.map