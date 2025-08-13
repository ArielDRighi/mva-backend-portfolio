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
exports.SatisfactionSurvey = void 0;
const typeorm_1 = require("typeorm");
let SatisfactionSurvey = class SatisfactionSurvey {
};
exports.SatisfactionSurvey = SatisfactionSurvey;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'encuesta_id' }),
    __metadata("design:type", Number)
], SatisfactionSurvey.prototype, "encuesta_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_empresa', length: 150 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "nombre_empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lugar_proyecto', length: 150 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "lugar_proyecto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contacto', length: 150, nullable: true }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'medio_contacto', length: 100 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "medio_contacto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tiempo_respuesta', length: 50 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "tiempo_respuesta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calificacion_atencion', type: 'int' }),
    __metadata("design:type", Number)
], SatisfactionSurvey.prototype, "calificacion_atencion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'accesibilidad_comercial', length: 50 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "accesibilidad_comercial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'relacion_precio_valor', length: 50 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "relacion_precio_valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recomendaria', length: 50 }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "recomendaria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comentario_adicional', type: 'text', nullable: true }),
    __metadata("design:type", String)
], SatisfactionSurvey.prototype, "comentario_adicional", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SatisfactionSurvey.prototype, "createdAt", void 0);
exports.SatisfactionSurvey = SatisfactionSurvey = __decorate([
    (0, typeorm_1.Entity)({ name: 'satisfaction_survey' })
], SatisfactionSurvey);
//# sourceMappingURL=satisfactionSurvey.entity.js.map