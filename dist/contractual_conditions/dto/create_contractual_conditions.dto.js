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
exports.CreateContractualConditionDto = void 0;
exports.normalizeEnumValue = normalizeEnumValue;
const class_validator_1 = require("class-validator");
const contractual_conditions_entity_1 = require("../entities/contractual_conditions.entity");
const class_transformer_1 = require("class-transformer");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
class CreateContractualConditionDto {
}
exports.CreateContractualConditionDto = CreateContractualConditionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    __metadata("design:type", Number)
], CreateContractualConditionDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], CreateContractualConditionDto.prototype, "fecha_inicio", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], CreateContractualConditionDto.prototype, "fecha_fin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => normalizeEnumValue(value)),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateContractualConditionDto.prototype, "condiciones_especificas", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateContractualConditionDto.prototype, "tarifa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateContractualConditionDto.prototype, "tarifa_alquiler", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateContractualConditionDto.prototype, "tarifa_instalacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateContractualConditionDto.prototype, "tarifa_limpieza", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(resource_states_enum_1.ServiceType),
    __metadata("design:type", String)
], CreateContractualConditionDto.prototype, "tipo_servicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateContractualConditionDto.prototype, "cantidad_banos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => normalizeEnumValue(value)),
    (0, class_validator_1.IsEnum)(contractual_conditions_entity_1.Periodicidad),
    __metadata("design:type", String)
], CreateContractualConditionDto.prototype, "periodicidad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(contractual_conditions_entity_1.EstadoContrato),
    __metadata("design:type", String)
], CreateContractualConditionDto.prototype, "estado", void 0);
function normalizeEnumValue(value) {
    if (typeof value !== 'string')
        return value;
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());
}
//# sourceMappingURL=create_contractual_conditions.dto.js.map