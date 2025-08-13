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
exports.ResourceAssignmentDto = exports.CreateServiceDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
const create_resource_assignment_dto_1 = require("./create-resource-assignment.dto");
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((o) => o.tipoServicio !== resource_states_enum_1.ServiceType.CAPACITACION),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "clienteId", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateServiceDto.prototype, "fechaProgramada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(resource_states_enum_1.ServiceType),
    (0, class_validator_1.ValidateIf)((o) => !o.condicionContractualId),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "tipoServicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(resource_states_enum_1.ServiceState),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.ValidateIf)((o) => !o.condicionContractualId),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "cantidadBanos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "empleadoAId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "empleadoBId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((o) => o.tipoServicio !== resource_states_enum_1.ServiceType.CAPACITACION),
    (0, class_validator_1.Min)(1, { message: 'La cantidad de vehículos debe ser al menos 1' }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "cantidadVehiculos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "notas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateServiceDto.prototype, "asignacionAutomatica", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_resource_assignment_dto_1.CreateResourceAssignmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateServiceDto.prototype, "asignacionesManual", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => !!o.tipoServicio &&
        [
            'LIMPIEZA',
            'RETIRO',
            'REEMPLAZO',
            'MANTENIMIENTO_IN_SITU',
            'REPARACION',
        ].includes(o.tipoServicio)),
    __metadata("design:type", Array)
], CreateServiceDto.prototype, "banosInstalados", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "condicionContractualId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateServiceDto.prototype, "forzar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "fechaFinAsignacion", void 0);
class ResourceAssignmentDto {
}
exports.ResourceAssignmentDto = ResourceAssignmentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['A', 'B']),
    __metadata("design:type", String)
], ResourceAssignmentDto.prototype, "rol", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResourceAssignmentDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResourceAssignmentDto.prototype, "vehiculoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], ResourceAssignmentDto.prototype, "banosIds", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceAssignmentDto.prototype, "search", void 0);
//# sourceMappingURL=create-service.dto.js.map