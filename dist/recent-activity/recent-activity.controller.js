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
exports.RecentActivityController = void 0;
const common_1 = require("@nestjs/common");
const recent_activity_service_1 = require("./recent-activity.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../roles/guards/roles.guard");
const roles_decorator_1 = require("../roles/decorators/roles.decorator");
const role_enum_1 = require("../roles/enums/role.enum");
let RecentActivityController = class RecentActivityController {
    constructor(recentActivityService) {
        this.recentActivityService = recentActivityService;
    }
    async getGlobalRecentActivity() {
        return this.recentActivityService.getRecentActivity();
    }
};
exports.RecentActivityController = RecentActivityController;
__decorate([
    (0, common_1.Get)('global'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.SUPERVISOR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecentActivityController.prototype, "getGlobalRecentActivity", null);
exports.RecentActivityController = RecentActivityController = __decorate([
    (0, common_1.Controller)('recent_activity'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [recent_activity_service_1.RecentActivityService])
], RecentActivityController);
//# sourceMappingURL=recent-activity.controller.js.map