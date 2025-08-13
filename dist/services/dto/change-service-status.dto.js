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
exports.ChangeServiceStatusDto = void 0;
const class_validator_1 = require("class-validator");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
class ChangeServiceStatusDto {
}
exports.ChangeServiceStatusDto = ChangeServiceStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(resource_states_enum_1.ServiceState),
    __metadata("design:type", String)
], ChangeServiceStatusDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ChangeServiceStatusDto.prototype, "forzar", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.estado === resource_states_enum_1.ServiceState.INCOMPLETO),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangeServiceStatusDto.prototype, "comentarioIncompleto", void 0);
//# sourceMappingURL=change-service-status.dto.js.map