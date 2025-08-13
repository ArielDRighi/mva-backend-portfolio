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
exports.MailerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const mailer_service_1 = require("../mailer.service");
const resource_states_enum_1 = require("../../common/enums/resource-states.enum");
let MailerInterceptor = class MailerInterceptor {
    constructor(mailerService, reflector, dataSource) {
        this.mailerService = mailerService;
        this.reflector = reflector;
        this.dataSource = dataSource;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)(async (data) => {
            const req = context.switchToHttp().getRequest();
            const method = req.method;
            const path = req.url;
            console.log('[MailerInterceptor] Método:', method);
            console.log('[MailerInterceptor] Path:', path);
            if (!data || typeof data !== 'object') {
                console.warn('[MailerInterceptor] Datos no válidos:', data);
                return;
            }
            const servicio = data;
            const asignaciones = servicio?.asignaciones || [];
            if (!servicio || !Array.isArray(asignaciones)) {
                console.warn('[MailerInterceptor] Servicio o asignaciones no válidos');
                return;
            }
            await this.handleServiceCreation(method, path, servicio, asignaciones);
            await this.handleServiceModification(method, path, servicio, asignaciones);
            await this.handleServiceStatusChange(method, path, servicio, asignaciones);
            await this.handleClaimNotification(method, path, data);
            await this.handleSurveyNotification(method, path, data);
            await this.handleServiceRequest(method, path, req);
            await this.handlePasswordReset(method, path, data);
            if (method === 'POST' && path.includes('/salary-advances')) {
                await this.handleSalaryAdvanceRequest(data);
            }
            if (method === 'PATCH' && path.includes('/salary-advances')) {
                await this.handleSalaryAdvanceResponse(data);
            }
        }));
    }
    async handleServiceCreation(method, path, servicio, asignaciones) {
        console.log('=== DEBUG INTERCEPTOR - handleServiceCreation INICIO ===');
        console.log('method:', method);
        console.log('path:', path);
        console.log('servicio.banosInstalados:', servicio.banosInstalados);
        console.log('asignaciones:', asignaciones);
        if (method !== 'POST' || !path.includes('/services')) {
            console.log('No es POST o no incluye /services, saliendo...');
            return;
        }
        const listaEmpleados = asignaciones
            .filter((a) => a?.empleado)
            .map((a) => {
            const emp = a.empleado;
            return {
                name: `${emp.nombre} ${emp.apellido}`,
                rol: a.rolEmpleado ?? null,
            };
        }) ?? [];
        const servicioId = servicio.id;
        const vehiculos = asignaciones
            .filter((a) => a?.vehiculo !== null && a?.vehiculo !== undefined)
            .map((a) => {
            const vehiculo = a.vehiculo;
            return `${vehiculo.marca || 'Sin marca'} ${vehiculo.modelo || 'Sin modelo'} (${vehiculo.placa || 'Sin placa'})`;
        })
            .filter((v, i, self) => self.indexOf(v) === i);
        const vehicleInfo = vehiculos.length > 0
            ? vehiculos.join(', ')
            : 'No hay vehículos asignados';
        let banos = [];
        const banosDesdeAsignaciones = asignaciones
            .filter((a) => a?.bano !== null && a?.bano !== undefined)
            .map((a) => {
            const bano = a.bano;
            return (bano.codigo_interno || `Baño ID: ${bano.baño_id || 'desconocido'}`);
        })
            .filter((b, i, self) => self.indexOf(b) === i);
        if (banosDesdeAsignaciones.length === 0 && servicio.banosInstalados?.length) {
            console.log('DEBUG CREATION: Consultando baños con repository, IDs:', servicio.banosInstalados);
            try {
                const toiletEntities = await this.dataSource.query(`SELECT baño_id, codigo_interno FROM chemical_toilets WHERE baño_id = ANY($1)`, [servicio.banosInstalados]);
                console.log('DEBUG CREATION: toiletEntities encontradas:', toiletEntities);
                banos = toiletEntities.map((toilet) => toilet.codigo_interno || `Baño ID: ${toilet.baño_id}`);
                console.log('DEBUG CREATION: banos mapeados:', banos);
            }
            catch (error) {
                console.error('Error al obtener información de baños:', error);
                banos = servicio.banosInstalados.map(id => `Baño ID: ${id}`);
            }
        }
        else {
            banos = banosDesdeAsignaciones;
        }
        console.log('DEBUG CREATION: Baños finales para email:', banos);
        const toilets = banos.length > 0 ? banos : ['No hay baños asignados'];
        const clients = [servicio.cliente?.nombre ?? 'Cliente desconocido'];
        const taskDate = servicio.fechaProgramada
            ? new Date(servicio.fechaProgramada).toLocaleDateString('es-CL')
            : 'Fecha no especificada';
        let clientAddress = '';
        let serviceStartDate = '';
        if (servicio['condicionContractual'] &&
            typeof servicio['condicionContractual'] === 'object') {
            clientAddress = servicio['condicionContractual'].direccion || '';
            if (servicio['condicionContractual'].fecha_inicio) {
                serviceStartDate = new Date(servicio['condicionContractual'].fecha_inicio).toLocaleDateString('es-CL');
            }
        }
        else if (servicio.ubicacion) {
            clientAddress = servicio.ubicacion || '';
        }
        for (const asignacion of asignaciones) {
            const empleado = asignacion?.empleado;
            if (!empleado?.email)
                continue;
            console.log(`[Interceptor] Enviando correo automático para servicio ID: ${servicio.id}`);
            await this.mailerService.sendRoute(empleado.email, empleado.nombre || 'Empleado', vehicleInfo, toilets, clients, servicio.tipoServicio ?? 'No definido', taskDate, servicioId, listaEmpleados, clientAddress, serviceStartDate);
        }
    }
    async handleServiceModification(method, path, servicio, asignaciones) {
        if (method !== 'PUT' || !path.includes('/services')) {
            return;
        }
        const vehiculos = asignaciones
            .filter((a) => a?.vehiculo !== null && a?.vehiculo !== undefined)
            .map((a) => {
            const vehiculo = a.vehiculo;
            return `${vehiculo.marca || 'Sin marca'} ${vehiculo.modelo || 'Sin modelo'} (${vehiculo.placa || 'Sin placa'})`;
        })
            .filter((v, i, self) => self.indexOf(v) === i);
        const vehicleInfo = vehiculos.length > 0
            ? vehiculos.join(', ')
            : 'No hay vehículos asignados';
        let banos = [];
        const banosDesdeAsignaciones = asignaciones
            .filter((a) => a?.bano !== null && a?.bano !== undefined)
            .map((a) => {
            const bano = a.bano;
            return (bano.codigo_interno || `Baño ID: ${bano.baño_id || 'desconocido'}`);
        })
            .filter((b, i, self) => self.indexOf(b) === i);
        if (banosDesdeAsignaciones.length === 0 && servicio.banosInstalados?.length) {
            try {
                const toiletEntities = await this.dataSource.query(`SELECT bano_id, codigo_interno FROM chemical_toilets WHERE bano_id = ANY($1)`, [servicio.banosInstalados]);
                banos = toiletEntities.map((toilet) => toilet.codigo_interno || `Baño ID: ${toilet.bano_id}`);
            }
            catch (error) {
                console.error('Error al obtener información de baños:', error);
                banos = servicio.banosInstalados.map(id => `Baño ID: ${id}`);
            }
        }
        else {
            banos = banosDesdeAsignaciones;
        }
        const toilets = banos.length > 0 ? banos : ['No hay baños asignados'];
        const clients = [servicio.cliente?.nombre ?? 'Cliente desconocido'];
        const taskDate = servicio.fechaProgramada
            ? new Date(servicio.fechaProgramada).toLocaleDateString('es-CL')
            : 'Fecha no especificada';
        let clientAddress = '';
        let serviceStartDate = '';
        if (servicio['condicionContractual'] &&
            typeof servicio['condicionContractual'] === 'object') {
            clientAddress = servicio['condicionContractual'].direccion || '';
            if (servicio['condicionContractual'].fecha_inicio) {
                serviceStartDate = new Date(servicio['condicionContractual'].fecha_inicio).toLocaleDateString('es-CL');
            }
        }
        else if (servicio.ubicacion) {
            clientAddress = servicio.ubicacion || '';
        }
        for (const asignacion of asignaciones) {
            const empleado = asignacion?.empleado;
            if (!empleado?.email)
                continue;
            await this.mailerService.sendRouteModified(empleado.email, empleado.nombre || 'Empleado', vehicleInfo, toilets, clients, servicio.tipoServicio ?? 'No definido', taskDate, clientAddress, serviceStartDate);
        }
    }
    async handleServiceStatusChange(method, path, servicio, asignaciones) {
        if (method !== 'PATCH' ||
            !path.includes('/estado') ||
            (servicio.estado !== resource_states_enum_1.ServiceState.EN_PROGRESO &&
                servicio.estado !== resource_states_enum_1.ServiceState.COMPLETADO &&
                servicio.estado !== resource_states_enum_1.ServiceState.CANCELADO)) {
            return;
        }
        const adminsEmails = await this.mailerService.getAdminEmails();
        const supervisorsEmails = await this.mailerService.getSupervisorEmails();
        const servicioId = servicio.id;
        const empleadosAsignados = asignaciones
            .filter((a) => a?.empleado)
            .map((a) => a.empleado)
            .filter(Boolean)
            .map((e) => `${e.nombre} ${e.apellido}`);
        const nombresEmpleados = empleadosAsignados.length > 0
            ? empleadosAsignados.join(', ')
            : 'Sin empleados asignados';
        const vehiculos = asignaciones
            .filter((a) => a?.vehiculo !== null && a?.vehiculo !== undefined)
            .map((a) => {
            const vehiculo = a.vehiculo;
            return `${vehiculo.marca || 'Sin marca'} ${vehiculo.modelo || 'Sin modelo'} (${vehiculo.placa || 'Sin placa'})`;
        })
            .filter((v, i, self) => self.indexOf(v) === i);
        const vehicleInfo = vehiculos.length > 0
            ? vehiculos.join(', ')
            : 'No hay vehículos asignados';
        let banos = [];
        const banosDesdeAsignaciones = asignaciones
            .filter((a) => a?.bano !== null && a?.bano !== undefined)
            .map((a) => {
            const bano = a.bano;
            return (bano.codigo_interno || `Baño ID: ${bano.baño_id || 'desconocido'}`);
        })
            .filter((b, i, self) => self.indexOf(b) === i);
        if (banosDesdeAsignaciones.length === 0 && servicio.banosInstalados?.length) {
            try {
                const toiletEntities = await this.dataSource.query(`SELECT bano_id, codigo_interno FROM chemical_toilets WHERE bano_id = ANY($1)`, [servicio.banosInstalados]);
                banos = toiletEntities.map((toilet) => toilet.codigo_interno || `Baño ID: ${toilet.bano_id}`);
            }
            catch (error) {
                console.error('Error al obtener información de baños:', error);
                banos = servicio.banosInstalados.map(id => `Baño ID: ${id}`);
            }
        }
        else {
            banos = banosDesdeAsignaciones;
        }
        const toilets = banos.length > 0 ? banos : ['No hay baños asignados'];
        const taskDate = servicio.fechaProgramada
            ? new Date(servicio.fechaProgramada).toLocaleDateString('es-CL')
            : 'Fecha no especificada';
        const taskDetails = {
            client: servicio.cliente?.nombre ?? 'Cliente desconocido',
            vehicle: vehicleInfo,
            serviceType: servicio.tipoServicio ?? 'No definido',
            toilets,
            taskDate,
            employees: nombresEmpleados,
            serviceId: servicioId,
        };
        if (servicio.estado === resource_states_enum_1.ServiceState.EN_PROGRESO) {
            await this.mailerService.sendInProgressNotification(adminsEmails, supervisorsEmails, nombresEmpleados, taskDetails);
        }
        else if (servicio.estado === resource_states_enum_1.ServiceState.CANCELADO) {
            const empleadoEmails = asignaciones
                .filter((a) => a?.empleado?.email)
                .map((a) => a.empleado.email);
            if (empleadoEmails.length > 0) {
                await this.mailerService.sendMail({
                    from: 'noreply@mva.com',
                    to: empleadoEmails,
                    subject: 'Servicio cancelado',
                    html: `<p>El servicio #${servicioId} ha sido cancelado.</p>`,
                });
            }
        }
        else {
            await this.mailerService.sendCompletionNotification(adminsEmails, supervisorsEmails, nombresEmpleados, taskDetails);
        }
    }
    async handleClaimNotification(method, path, data) {
        if (method !== 'POST' || !path.includes('/clients_portal/claims')) {
            return;
        }
        console.log('[MailerInterceptor] Reclamo detectado. Preparando notificación...');
        try {
            const claimData = data;
            if (!claimData || !claimData.cliente || !claimData.titulo) {
                console.warn('[MailerInterceptor] Datos de reclamo incompletos:', claimData);
                return;
            }
            const adminsEmails = await this.mailerService.getAdminEmails();
            const supervisorsEmails = await this.mailerService.getSupervisorEmails();
            console.log('[MailerInterceptor] Correos obtenidos:', {
                adminsEmails,
                supervisorsEmails,
            });
            await this.mailerService.sendClaimNotification(adminsEmails, supervisorsEmails, claimData.cliente || 'Cliente desconocido', claimData.titulo || 'Sin título', claimData.descripcion || 'Sin descripción', claimData.tipoReclamo || 'No especificado', claimData.fechaIncidente || 'Fecha no especificada');
            console.log('[MailerInterceptor] Notificación de reclamo enviada.');
        }
        catch (err) {
            console.error('[MailerInterceptor] Error enviando notificación de reclamo:', err);
        }
    }
    async handleSurveyNotification(method, path, data) {
        if (method !== 'POST' ||
            !path.includes('/clients_portal/satisfaction_surveys')) {
            return;
        }
        try {
            const surveyData = data;
            if (!surveyData) {
                console.warn('[MailerInterceptor] Datos de encuesta no válidos');
                return;
            }
            const adminsEmails = await this.mailerService.getAdminEmails();
            const supervisorsEmails = await this.mailerService.getSupervisorEmails();
            await this.mailerService.sendSurveyNotification(adminsEmails, supervisorsEmails, surveyData.cliente || 'Cliente desconocido', surveyData.fecha_mantenimiento || null, surveyData.calificacion || 0, surveyData.comentario || 'Sin comentarios', surveyData.asunto || 'Sin asunto', surveyData.aspecto_evaluado || 'No especificado');
        }
        catch (err) {
            console.error('[MailerInterceptor] Error enviando notificación de encuesta:', err);
        }
    }
    async handleServiceRequest(method, path, req) {
        if (method !== 'POST' ||
            !path.includes('/clients_portal/ask_for_service')) {
            return;
        }
        try {
            const formData = req.body;
            if (!formData) {
                console.warn('[MailerInterceptor] Datos de solicitud no válidos');
                return;
            }
            console.log('[MailerInterceptor] Datos del formulario recibidos:', formData);
            const adminsEmails = await this.mailerService.getAdminEmails();
            const supervisorsEmails = await this.mailerService.getSupervisorEmails();
            await this.mailerService.sendServiceNotification(adminsEmails, supervisorsEmails, formData.nombrePersona || 'No especificado', formData.rolPersona || 'No especificado', formData.email || 'No especificado', formData.telefono || 'No especificado', formData.nombreEmpresa || 'No especificada', formData.cuit || 'No especificado', formData.rubroEmpresa || 'No especificado', formData.zonaDireccion || 'No especificada', formData.cantidadBaños || 'No especificada', formData.tipoEvento || 'No especificado', formData.duracionAlquiler || 'No especificada', formData.comentarios || 'Sin comentarios');
        }
        catch (err) {
            console.error('[MailerInterceptor] Error enviando notificación de solicitud:', err);
        }
    }
    async handlePasswordReset(method, path, data) {
        if (!['PUT', 'POST'].includes(method) ||
            !(path.includes('/auth/forgot_password') ||
                path.includes('/auth/change_password'))) {
            return;
        }
        try {
            if (!data || !data.user || !data.user.newPassword) {
                console.warn('[MailerInterceptor] Datos incompletos para envío de mail:', data);
                return;
            }
            const { email, nombre, newPassword } = data.user;
            if (path.includes('/auth/forgot_password')) {
                await this.mailerService.sendPasswordResetEmail(email, nombre || 'Usuario', newPassword);
            }
            else if (path.includes('/auth/change_password')) {
                await this.mailerService.sendPasswordChangeConfirmationEmail(email, nombre || 'Usuario', newPassword);
            }
            console.log('[MailerInterceptor] Correo de contraseña enviado.');
        }
        catch (err) {
            console.error('[MailerInterceptor] Error al enviar correo:', err);
        }
    }
    async handleSalaryAdvanceRequest(data) {
        console.log('[MailerInterceptor] Datos recibidos en handleSalaryAdvanceRequest:', data);
        if (!data || !data.id || !data.amount || !data.employee)
            return;
        const admins = await this.mailerService.getAdminEmails();
        if (!admins || admins.length === 0) {
            console.warn('[MailerInterceptor] No se encontraron correos de administradores');
            return;
        }
        try {
            console.log('[MailerInterceptor] Llamando a sendSalaryAdvanceRequestToAdmins...');
            await this.mailerService.sendSalaryAdvanceRequestToAdmins(data);
            console.log('[MailerInterceptor] Correo enviado a administradores por solicitud de adelanto');
        }
        catch (error) {
            console.error('[MailerInterceptor] Error al enviar correo de solicitud de adelanto:', error);
        }
    }
    async handleSalaryAdvanceResponse(data) {
        console.log('[MailerInterceptor] Datos recibidos en handleSalaryAdvanceResponse:', data);
        if (!data || !data.status || !data.employee?.email) {
            console.warn('[MailerInterceptor] Datos incompletos para notificación al empleado');
            return;
        }
        try {
            await this.mailerService.sendSalaryAdvanceResponseToEmployee(data);
            console.log('[MailerInterceptor] Correo enviado al empleado por respuesta de adelanto');
        }
        catch (error) {
            console.error('[MailerInterceptor] Error al enviar correo de respuesta de adelanto:', error);
        }
    }
};
exports.MailerInterceptor = MailerInterceptor;
exports.MailerInterceptor = MailerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService,
        core_1.Reflector,
        typeorm_1.DataSource])
], MailerInterceptor);
//# sourceMappingURL=mailer.interceptor.js.map