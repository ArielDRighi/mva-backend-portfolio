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
exports.CreateClaimDto = void 0;
const class_validator_1 = require("class-validator");
const claim_entity_1 = require("../entities/claim.entity");
class CreateClaimDto {
    constructor() {
        this.tipoReclamo = claim_entity_1.TipoReclamo.OTROS;
        this.prioridad = claim_entity_1.PrioridadReclamo.MEDIA;
        this.esUrgente = false;
        this.requiereCompensacion = false;
    }
}
exports.CreateClaimDto = CreateClaimDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 255),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "cliente", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 150),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(claim_entity_1.TipoReclamo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "tipoReclamo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(claim_entity_1.PrioridadReclamo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "prioridad", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "fechaIncidente", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateClaimDto.prototype, "adjuntosUrls", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateClaimDto.prototype, "esUrgente", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateClaimDto.prototype, "requiereCompensacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "compensacionDetalles", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "notasInternas", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateClaimDto.prototype, "empleadoAsignado", void 0);
//# sourceMappingURL=createClaim.dto.js.map