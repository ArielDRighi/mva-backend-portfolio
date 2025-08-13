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
exports.ChemicalToilet = void 0;
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
const toilet_maintenance_entity_1 = require("../../toilet_maintenance/entities/toilet_maintenance.entity");
const typeorm_1 = require("typeorm");
let ChemicalToilet = class ChemicalToilet {
};
exports.ChemicalToilet = ChemicalToilet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChemicalToilet.prototype, "ba\u00F1o_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ChemicalToilet.prototype, "codigo_interno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChemicalToilet.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ChemicalToilet.prototype, "fecha_adquisicion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: resource_states_enum_1.ResourceState,
        default: resource_states_enum_1.ResourceState.DISPONIBLE,
    }),
    __metadata("design:type", String)
], ChemicalToilet.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => toilet_maintenance_entity_1.ToiletMaintenance, (maintenance) => maintenance.toilet, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ChemicalToilet.prototype, "maintenances", void 0);
exports.ChemicalToilet = ChemicalToilet = __decorate([
    (0, typeorm_1.Entity)({ name: 'chemical_toilets' })
], ChemicalToilet);
//# sourceMappingURL=chemical_toilet.entity.js.map