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
exports.ClothingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clothing_entity_1 = require("./entities/clothing.entity");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../employees/entities/employee.entity");
const ExcelJS = require("exceljs");
let ClothingService = class ClothingService {
    constructor(tallesRepository, empleadoRepository) {
        this.tallesRepository = tallesRepository;
        this.empleadoRepository = empleadoRepository;
    }
    async createClothingSpecs(talles, empleadoId) {
        const empleado = await this.empleadoRepository.findOne({
            where: { id: empleadoId },
        });
        if (!empleado) {
            throw new common_1.BadRequestException('Empleado no encontrado');
        }
        const ropaTalles = this.tallesRepository.create({
            ...talles,
            empleado,
        });
        return this.tallesRepository.save(ropaTalles);
    }
    async getClothingSpecs(empleadoId) {
        const talles = await this.tallesRepository.findOne({
            where: { empleado: { id: empleadoId } },
            relations: ['empleado'],
        });
        if (!talles) {
            throw new common_1.BadRequestException('Talles no encontrados');
        }
        return talles;
    }
    async getAllClothingSpecs(page = 1, limit = 10, search = '') {
        try {
            const queryBuilder = this.tallesRepository
                .createQueryBuilder('ropaTalles')
                .leftJoinAndSelect('ropaTalles.empleado', 'empleado');
            if (search) {
                const searchTerms = search.toLowerCase().split(' ');
                queryBuilder.where(`LOWER(empleado.nombre) ILIKE :term0
  OR LOWER(empleado.apellido) ILIKE :term0
  OR LOWER(empleado.documento) ILIKE :term0
  OR LOWER(CAST(ropaTalles.calzado_talle AS TEXT)) ILIKE :term0
  OR LOWER(CAST(ropaTalles.pantalon_talle AS TEXT)) ILIKE :term0
  OR LOWER(CAST(ropaTalles.camisa_talle AS TEXT)) ILIKE :term0`, { term0: `%${searchTerms[0]}%` });
                for (let i = 1; i < searchTerms.length; i++) {
                    queryBuilder.andWhere(`LOWER(UNACCENT(empleado.nombre)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.apellido)) LIKE :term${i}
          OR LOWER(UNACCENT(empleado.documento)) LIKE :term${i}
          OR LOWER(UNACCENT(CAST(ropaTalles.calzado_talle AS TEXT))) LIKE :term${i}
          OR LOWER(UNACCENT(CAST(ropaTalles.pantalon_talle AS TEXT))) LIKE :term${i}
          OR LOWER(UNACCENT(CAST(ropaTalles.camisa_talle AS TEXT))) LIKE :term${i}`, { [`term${i}`]: `%${searchTerms[i]}%` });
                }
            }
            queryBuilder.skip((page - 1) * limit).take(limit);
            const [data, totalItems] = await queryBuilder.getManyAndCount();
            return {
                data,
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            throw new common_1.BadRequestException('Error al obtener talles: ' + errorMessage);
        }
    }
    async updateClothingSpecs(talles, empleadoId) {
        const empleado = await this.empleadoRepository.findOne({
            where: { id: empleadoId },
        });
        if (!empleado) {
            throw new common_1.BadRequestException('Empleado no encontrado');
        }
        const ropaTalles = await this.tallesRepository.findOne({
            where: { empleado: { id: empleadoId } },
        });
        if (!ropaTalles) {
            throw new common_1.BadRequestException('Talles no encontrados');
        }
        Object.assign(ropaTalles, talles);
        return this.tallesRepository.save(ropaTalles);
    }
    async deleteClothingSpecs(empleadoId) {
        const empleado = await this.empleadoRepository.findOne({
            where: { id: empleadoId },
        });
        if (!empleado) {
            throw new common_1.BadRequestException('Empleado no encontrado');
        }
        const ropaTalles = await this.tallesRepository.findOne({
            where: { empleado: { id: empleadoId } },
        });
        if (!ropaTalles) {
            throw new common_1.BadRequestException('Talles no encontrados');
        }
        await this.tallesRepository.remove(ropaTalles);
        return { message: 'Talles eliminados correctamente' };
    }
    async exportToExcel(res) {
        const specs = await this.tallesRepository.find({
            relations: ['empleado'],
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Talles Ropa');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Empleado', key: 'empleado', width: 30 },
            { header: 'Calzado', key: 'calzado_talle', width: 10 },
            { header: 'Pantalón', key: 'pantalon_talle', width: 10 },
            { header: 'Camisa', key: 'camisa_talle', width: 10 },
            { header: 'Campera BigNort', key: 'campera_bigNort_talle', width: 15 },
            { header: 'Piel BigNort', key: 'pielBigNort_talle', width: 15 },
            { header: 'Medias', key: 'medias_talle', width: 10 },
            {
                header: 'Pantalón Térmico BigNort',
                key: 'pantalon_termico_bigNort_talle',
                width: 20,
            },
            {
                header: 'Campera Polar BigNort',
                key: 'campera_polar_bigNort_talle',
                width: 20,
            },
            { header: 'Mameluco', key: 'mameluco_talle', width: 10 },
            { header: 'Fecha Creación', key: 'createdAt', width: 20 },
            { header: 'Fecha Actualización', key: 'updatedAt', width: 20 },
        ];
        specs.forEach((spec) => {
            worksheet.addRow({
                id: spec.id,
                empleado: spec.empleado
                    ? `${spec.empleado.nombre} ${spec.empleado.apellido}`
                    : 'Sin empleado',
                calzado_talle: spec.calzado_talle,
                pantalon_talle: spec.pantalon_talle,
                camisa_talle: spec.camisa_talle,
                campera_bigNort_talle: spec.campera_bigNort_talle,
                pielBigNort_talle: spec.pielBigNort_talle,
                medias_talle: spec.medias_talle,
                pantalon_termico_bigNort_talle: spec.pantalon_termico_bigNort_talle,
                campera_polar_bigNort_talle: spec.campera_polar_bigNort_talle,
                mameluco_talle: spec.mameluco_talle,
                createdAt: spec.createdAt
                    ? spec.createdAt.toISOString().slice(0, 19).replace('T', ' ')
                    : '',
                updatedAt: spec.updatedAt
                    ? spec.updatedAt.toISOString().slice(0, 19).replace('T', ' ')
                    : '',
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=talles_ropa.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    }
};
exports.ClothingService = ClothingService;
exports.ClothingService = ClothingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clothing_entity_1.RopaTalles)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Empleado)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClothingService);
//# sourceMappingURL=clothing.service.js.map