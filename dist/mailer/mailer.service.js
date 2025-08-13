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
exports.MailerService = void 0;
const nodemailer = require("nodemailer");
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../roles/enums/role.enum");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mailer_utils_1 = require("./utils/mailer.utils");
let MailerService = class MailerService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        const emailUser = process.env.EMAIL_USER || '';
        const emailPass = process.env.EMAIL_PASS || '';
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });
    }
    async sendMail(mailOptions) {
        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado a ${Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to}`);
        }
        catch (error) {
            console.error(`Error al enviar el correo a ${Array.isArray(mailOptions.to) ? mailOptions.to.join(', ') : mailOptions.to}`, error);
        }
    }
    generateEmailContent(title, body) {
        return (0, mailer_utils_1.generateEmailContent)(title, body);
    }
    async sendRoute(email, name, vehicle, toilets, clients, serviceType, taskDate, serviceId, assignedEmployees, clientAddress, serviceStartDate) {
        const subject = '🚚 ¡Nueva tarea de trabajo asignada!';
        let body = `
      <p style="font-size: 16px;">¡Hola ${name || 'Empleado'}!</p>
      <p style="font-size: 16px;">Se te ha asignado una nueva tarea de trabajo para el día <strong>${taskDate || 'fecha no especificada'}</strong>.</p>`;
        if (clientAddress || serviceStartDate) {
            body += `
      <p style="font-size: 16px; background-color: #f2f2f2; padding: 10px; border-left: 4px solid #7E3AF2;">
        <strong>Información importante:</strong><br>`;
            if (clientAddress) {
                body += `<strong>📍 Dirección:</strong> ${clientAddress}<br>`;
            }
            if (serviceStartDate) {
                body += `<strong>📅 Fecha de inicio del servicio:</strong> ${serviceStartDate}`;
            }
            body += `
      </p>`;
        }
        body += `
      <p style="font-size: 16px;">Detalles de la tarea:</p>
      <ul>`;
        if (serviceId) {
            body += `
        <li><strong>ID del servicio:</strong> ${serviceId}</li>`;
        }
        body += `
        <li><strong>Vehículo a utilizar:</strong> ${vehicle || 'No asignado'}</li>
        <li><strong>Tipo de servicio:</strong> ${serviceType || 'No especificado'}</li>
        <li><strong>Baños a trasladar o mantener:</strong></li>
        <ul>
          ${toilets && toilets.length > 0 ? toilets.map((toilet) => `<li>${toilet}</li>`).join('') : '<li>No hay baños asignados</li>'}
        </ul>
        <li><strong>Clientes a visitar:</strong></li>
        <ul>
          ${clients && clients.length > 0 ? clients.map((client) => `<li>${client}</li>`).join('') : '<li>Cliente no especificado</li>'}
        </ul>`;
        if (assignedEmployees && assignedEmployees.length > 0) {
            body += `
    <li><strong>Equipo asignado al servicio:</strong></li>
    <ul>
      ${assignedEmployees
                .map((emp) => `<li>${emp.name}${emp.rol ? ` (Rol ${emp.rol})` : ''}</li>`)
                .join('')}
    </ul>`;
        }
        body += `
      </ul>
      <p style="font-size: 16px;">¡Gracias por tu compromiso y buen trabajo!</p>
    `;
        const htmlContent = this.generateEmailContent('¡Nueva tarea de trabajo asignada!', body);
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: email,
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
            console.log(`Correo enviado exitosamente a ${email}}`);
        }
        catch (error) {
            console.error(`Error al enviar el correo a ${email}`, error);
        }
    }
    async sendRouteModified(email, name, vehicle, toilets, clients, serviceType, taskDate, clientAddress, serviceStartDate) {
        const subject = '🔔 ¡Tu tarea asignada sufrió modificaciones!';
        let body = `
      <p style="font-size: 16px;">¡Hola ${name || 'Empleado'}!</p>
      <p style="font-size: 16px;">Queremos informarte que tu tarea asignada ha sido actualizada para el día <strong>${taskDate || 'fecha no especificada'}</strong>.</p>`;
        if (clientAddress || serviceStartDate) {
            body += `
      <p style="font-size: 16px; background-color: #f2f2f2; padding: 10px; border-left: 4px solid #7E3AF2;">
        <strong>Información importante:</strong><br>`;
            if (clientAddress) {
                body += `<strong>📍 Dirección:</strong> ${clientAddress}<br>`;
            }
            if (serviceStartDate) {
                body += `<strong>📅 Fecha de inicio del servicio:</strong> ${serviceStartDate}`;
            }
            body += `
      </p>`;
        }
        body += `
      <p style="font-size: 16px;">Aquí están los detalles de la nueva tarea asignada:</p>
      <ul>
        <li><strong>Vehículo asignado:</strong> ${vehicle || 'No asignado'}</li>
        <li><strong>Tipo de servicio:</strong> ${serviceType || 'No especificado'}</li>
        <li><strong>Baños a trasladar o mantener:</strong></li>
        <ul>
          ${toilets && toilets.length > 0 ? toilets.map((toilet) => `<li>${toilet}</li>`).join('') : '<li>No hay baños asignados</li>'}
        </ul>
        <li><strong>Clientes a visitar:</strong></li>
        <ul>
          ${clients && clients.length > 0 ? clients.map((client) => `<li>${client}</li>`).join('') : '<li>Cliente no especificado</li>'}
        </ul>
      </ul>
      <p style="font-size: 16px;">Asegúrate de revisar los cambios y estar preparado para la nueva ruta. ¡Gracias por tu trabajo!</p>
    `;
        const htmlContent = this.generateEmailContent('¡Tu tarea asignada sufrió modificaciones!', body);
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: email,
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error(`Error al enviar el correo de modificaciones a ${email}`, error);
        }
    }
    async sendInProgressNotification(adminsEmails, supervisorsEmails, employeeName, taskDetails) {
        const subject = '🚚 ¡El trabajo asignado ha comenzado!';
        const body = `
      <p style="font-size: 16px;">¡Hola!</p>
      <p style="font-size: 16px;">El trabajo asignado a <strong>${employeeName || 'Empleado sin nombre'}</strong> ha <strong>comenzado</strong> según lo programado.</p>
      <p style="font-size: 16px;">Aquí están los detalles de la tarea en curso:</p>
      <ul>
        ${taskDetails?.serviceId ? `<li><strong>ID del servicio:</strong> ${taskDetails.serviceId}</li>` : ''}
        <li><strong>Cliente:</strong> ${taskDetails?.client || 'No especificado'}</li>
        <li><strong>Empleados asignados:</strong> ${employeeName || 'No especificado'}</li>
        <li><strong>Vehículo utilizado:</strong> ${taskDetails?.vehicle || 'No asignado'}</li>
        <li><strong>Tipo de servicio:</strong> ${taskDetails?.serviceType || 'No especificado'}</li>
        <li><strong>Baños asignados:</strong></li>
        <ul>
          ${taskDetails?.toilets && taskDetails.toilets.length > 0
            ? taskDetails.toilets
                .map((toilet) => `<li>${toilet}</li>`)
                .join('')
            : '<li>No hay baños asignados</li>'}
        </ul>
        <li><strong>Fecha de inicio:</strong> ${taskDetails?.taskDate || 'No especificada'}</li>
      </ul>
      <p style="font-size: 16px;">Este mensaje es solo informativo. Gracias por tu atención.</p>
    `;
        const htmlContent = this.generateEmailContent('¡Tarea en curso!', body);
        const safeAdminEmails = adminsEmails || [];
        const safeSupervisorEmails = supervisorsEmails || [];
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: [...safeAdminEmails, ...safeSupervisorEmails],
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar el correo de tarea en progreso', error);
        }
    }
    async sendCompletionNotification(adminsEmails, supervisorsEmails, employeeName, taskDetails) {
        const subject = '✔️ ¡El trabajo asignado fue completado con éxito!';
        const body = `
      <p style="font-size: 16px;">¡Hola!</p>
      <p style="font-size: 16px;">El trabajo asignado a <strong>${employeeName || 'Empleado sin nombre'}</strong> ha sido completado con éxito.</p>
      <p style="font-size: 16px;">Detalles de la tarea completada:</p>
      <ul>
        ${taskDetails?.serviceId ? `<li><strong>ID del servicio:</strong> ${taskDetails.serviceId}</li>` : ''}
        <li><strong>Cliente visitado:</strong> ${taskDetails?.client || 'No especificado'}</li>
        <li><strong>Empleados asignados:</strong> ${employeeName || 'No especificado'}</li>
        <li><strong>Vehículo utilizado:</strong> ${taskDetails?.vehicle || 'No asignado'}</li>
        <li><strong>Servicio realizado:</strong> ${taskDetails?.serviceType || 'No especificado'}</li>
        <li><strong>Baños atendidos:</strong></li>
        <ul>
          ${taskDetails?.toilets && taskDetails.toilets.length > 0
            ? taskDetails.toilets
                .map((toilet) => `<li>${toilet}</li>`)
                .join('')
            : '<li>No hay baños asignados</li>'}
        </ul>
        <li><strong>Fecha de ejecución:</strong> ${taskDetails?.taskDate || 'No especificada'}</li>
      </ul>
      <p style="font-size: 16px;">Gracias por tu atención.</p>
    `;
        const htmlContent = this.generateEmailContent('¡Trabajo completado con éxito!', body);
        const safeAdminEmails = adminsEmails || [];
        const safeSupervisorEmails = supervisorsEmails || [];
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: [...safeAdminEmails, ...safeSupervisorEmails],
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error al enviar el correo de notificación de tarea completada', error);
        }
    }
    async sendClaimNotification(adminsEmails, supervisorsEmails, clientName, claimTitle, claimDescription, claimType, claimDate) {
        const subject = '📝 ¡Nuevo reclamo recibido!';
        const body = `
      <p style="font-size: 16px;">¡Hola!</p>
      <p style="font-size: 16px;">Se ha recibido un nuevo reclamo de <strong>${clientName || 'Cliente'}</strong>.</p>
      <p style="font-size: 16px;">Detalles del reclamo:</p>
      <ul>
        <li><strong>Titulo:</strong> ${claimTitle || 'Sin título'}</li>
        <li><strong>Tipo de reclamo:</strong> ${claimType || 'No especificado'}</li>
        <li><strong>Descripción:</strong> ${claimDescription || 'Sin descripción'}</li>
        <li><strong>Fecha del reclamo:</strong> ${claimDate || 'No especificada'}</li>
      </ul>
      <p style="font-size: 16px;">Gracias por tu atención.</p>
    `;
        const htmlContent = this.generateEmailContent('¡Nuevo reclamo recibido!', body);
        const safeAdminEmails = adminsEmails || [];
        const safeSupervisorEmails = supervisorsEmails || [];
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: 'info@mvasrl.com',
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar el correo de reclamo', error);
        }
    }
    async getAdminEmails() {
        const admins = await this.userRepository.find({
            where: {
                roles: (0, typeorm_2.ArrayContains)([role_enum_1.Role.ADMIN]),
            },
            select: ['email'],
        });
        return admins.map((admin) => admin.email);
    }
    async getSupervisorEmails() {
        const supervisors = await this.userRepository.find({
            where: {
                roles: (0, typeorm_2.ArrayContains)([role_enum_1.Role.SUPERVISOR]),
            },
            select: ['email'],
        });
        return supervisors.map((supervisor) => supervisor.email);
    }
    async sendSurveyNotification(adminsEmails, supervisorsEmails, clientName, maintenanceDate, surveyRating, surveyComments, surveyAsunto, evaluatedAspects) {
        const subject = '⭐ ¡Nueva encuesta de satisfacción recibida!';
        const formattedDate = maintenanceDate
            ? new Date(maintenanceDate).toLocaleDateString('es-CL')
            : 'No especificada';
        const body = `
      <p style="font-size: 16px;">¡Hola!</p>
      <p style="font-size: 16px;">Se ha recibido una nueva encuesta de satisfacción de <strong>${clientName || 'Cliente'}</strong>.</p>
      <p style="font-size: 16px;">Detalles de la encuesta:</p>
      <ul>
        <li><strong>Nombre del cliente:</strong> ${clientName || 'No especificado'}</li>
        <li><strong>Fecha de Mantenimiento:</strong> ${formattedDate}</li>
        <li><strong>Calificación general:</strong> ${surveyRating || 'No especificada'}</li>
        <li><strong>Comentarios:</strong> ${surveyComments || 'Sin comentarios'}</li>
        <li><strong>Asunto:</strong> ${surveyAsunto || 'Sin asunto'}</li>
        <li><strong>Aspecto Evaluado:</strong> ${evaluatedAspects || 'No especificado'}</li>
      </ul>
      <p style="font-size: 16px;">Gracias por tu atención.</p>
    `;
        const htmlContent = this.generateEmailContent('¡Nueva encuesta de satisfacción recibida!', body);
        const safeAdminEmails = adminsEmails || [];
        const safeSupervisorEmails = supervisorsEmails || [];
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: [...safeAdminEmails, ...safeSupervisorEmails],
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar el correo de encuesta de satisfacción', error);
        }
    }
    async sendServiceNotification(adminsEmails, supervisorsEmails, nombrePersona, rolPersona, email, telefono, nombreEmpresa, cuit, rubroEmpresa, zonaDireccion, cantidadBaños, tipoEvento, duracionAlquiler, comentarios) {
        const subject = '🛠️ ¡Nueva solicitud de servicio recibida!';
        const body = `
      <p style="font-size: 16px;">¡Hola!</p>
      <p style="font-size: 16px;">Se ha recibido una nueva solicitud de servicio.</p>
      <p style="font-size: 16px;">Detalles del cliente:</p>
      <ul>
        <li><strong>Nombre de la persona:</strong> ${nombrePersona || 'No especificado'}</li>
        <li><strong>Rol de la persona:</strong> ${rolPersona || 'No especificado'}</li>
        <li><strong>Email:</strong> ${email || 'No especificado'}</li>
        <li><strong>Teléfono:</strong> ${telefono || 'No especificado'}</li>
      </ul>
      <p style="font-size: 16px;">Detalles de la empresa:</p>
      <ul>
        <li><strong>Nombre de la empresa:</strong> ${nombreEmpresa || 'No especificado'}</li>
        <li><strong>CUIT:</strong> ${cuit || 'No especificado'}</li>
        <li><strong>Rubro de la empresa:</strong> ${rubroEmpresa || 'No especificado'}</li>
        <li><strong>Zona de dirección:</strong> ${zonaDireccion || 'No especificada'}</li>
      </ul>
      <p style="font-size: 16px;">Detalles del servicio:</p>
      <ul>
        <li><strong>Cantidad de baños:</strong> ${cantidadBaños || 'No especificado'}</li>
        <li><strong>Tipo de evento:</strong> ${tipoEvento || 'No especificado'}</li>
        <li><strong>Duración del alquiler:</strong> ${duracionAlquiler || 'No especificada'}</li>
        <li><strong>Comentarios:</strong> ${comentarios || 'Sin comentarios'}</li>
      </ul>
      <p style="font-size: 16px;">Gracias por tu atención.</p>
    `;
        const htmlContent = this.generateEmailContent('¡Nueva solicitud de servicio recibida!', body);
        const safeAdminEmails = adminsEmails || [];
        const safeSupervisorEmails = supervisorsEmails || [];
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: 'info@mvasrl.com',
            subject,
            html: htmlContent,
        };
        try {
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar el correo de solicitud de servicio', error);
        }
    }
    async sendPasswordResetEmail(email, name, password) {
        const subject = 'Recupera tu contraseña 🔑';
        const FrontUrl = process.env.FRONT_URL || 'http://localhost:3000';
        const body = `
      <p>Hola ${name}👋,</p>
    <p>Tu nueva contraseña es: <strong>${password}</strong></p>
    <p>Haz clic en el siguiente enlace para modificar tu contraseña:</p>
    <p><a href=${FrontUrl} style="color: #FF69B4; text-decoration: none; font-weight: bold;">🔗 Modificar contraseña</a></p>
    <p>Si no solicitaste este cambio, ignora este correo.</p>
  `;
        const htmlContent = this.generateEmailContent('Recupera tu contraseña 🔑', body);
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: [email],
            subject,
            html: htmlContent,
        };
        try {
            console.log('Enviando correo de recuperación de contraseña...');
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar el correo de recuperar contraseña', error);
        }
    }
    async sendPasswordChangeConfirmationEmail(email, name, password) {
        const subject = 'Tu contraseña fue modificada 🛡️';
        const currentDate = new Date().toLocaleString('es-AR', {
            dateStyle: 'long',
            timeStyle: 'short',
        });
        const body = `
      <p>Hola ${name}👋,</p>
      <p>Te informamos que en el día de la fecha (<strong>${currentDate}</strong>) realizaste una modificación de contraseña en tu cuenta.</p>
      <p>Tu nueva contraseña es: <strong>${password}</strong></p>
      <p>Te recomendamos recordar esta contraseña o almacenarla en un lugar seguro.</p>
      <p>Si no realizaste esta acción, comunícate de inmediato con nuestro equipo de soporte.</p>
      <p>Saludos,<br>El equipo de soporte</p>
    `;
        const htmlContent = this.generateEmailContent(subject, body);
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: email,
            subject,
            html: htmlContent,
        };
        try {
            console.log('📧 Enviando correo de confirmación de cambio de contraseña...');
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar correo de cambio de contraseña', error);
        }
    }
    async sendSalaryAdvanceRequestToAdmins(data) {
        console.log('[MailerService] Datos recibidos para solicitud:', data);
        const { employee, amount, reason, createdAt } = data;
        const adminEmails = await this.getAdminEmails();
        console.log('[MailerService] Correos de administradores:', adminEmails);
        if (!adminEmails || adminEmails.length === 0) {
            console.warn('[MailerService] No se encontraron correos de administradores');
            return;
        }
        if (!employee?.nombre ||
            !employee?.apellido ||
            !employee?.email ||
            !amount ||
            !createdAt) {
            console.warn('[MailerService] Datos insuficientes para enviar solicitud de adelanto');
            return;
        }
        const subject = 'Nueva solicitud de adelanto salarial 📩';
        const formattedDate = new Date(createdAt).toLocaleString('es-AR', {
            dateStyle: 'long',
            timeStyle: 'short',
        });
        const body = `
      <p>Hola equipo,</p>
      <p>El empleado <strong>${employee.nombre} ${employee.apellido}</strong> (<a href="mailto:${employee.email}">${employee.email}</a>) ha solicitado un adelanto salarial.</p>
      <ul>
        <li><strong>Monto solicitado:</strong> $${parseFloat(amount).toFixed(2)}</li>
        <li><strong>Motivo:</strong> ${reason}</li>
        <li><strong>Fecha de solicitud:</strong> ${formattedDate}</li>
      </ul>
      <p>Por favor, gestionen esta solicitud a la brevedad.</p>
      <p>Saludos,<br>El sistema de notificaciones</p>
    `;
        const htmlContent = this.generateEmailContent(subject, body);
        console.log('[MailerService] Contenido del correo:', htmlContent);
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: adminEmails.join(','),
            subject,
            html: htmlContent,
        };
        console.log('[MailerService] Opciones de correo:', mailOptions);
        try {
            console.log('📧 Enviando correo de solicitud de adelanto salarial a administradores...');
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar correo de adelanto salarial a administradores', error);
        }
    }
    async sendSalaryAdvanceResponseToEmployee(data) {
        const { employee, status, updatedAt, reason } = data;
        if (!employee?.nombre || !employee?.email || !status || !updatedAt) {
            return;
        }
        const subject = 'Respuesta a tu solicitud de adelanto salarial 💬';
        const formattedDate = new Date(updatedAt).toLocaleString('es-AR', {
            dateStyle: 'long',
            timeStyle: 'short',
        });
        const statusText = status === 'approved'
            ? 'Aprobada ✅'
            : status === 'rejected'
                ? 'Rechazada ❌'
                : 'Pendiente ⏳';
        let body = `
      <p>Hola <strong>${employee.nombre}</strong>,</p>
      <p>Tu solicitud de adelanto salarial ha sido <strong>${statusText}</strong>.</p>
      <p><strong>Fecha de respuesta:</strong> ${formattedDate}</p>
    `;
        body += `
      <p>Gracias por utilizar nuestro sistema.</p>
      <p>Saludos,<br>El equipo administrativo</p>
    `;
        const htmlContent = this.generateEmailContent(subject, body);
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: employee.email,
            subject,
            html: htmlContent,
        };
        try {
            console.log('[MailerService] Enviando correo de respuesta de adelanto al empleado...');
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar correo al empleado sobre adelanto salarial', error);
        }
    }
    async sendExpiringLicenseAlert(adminsEmails, supervisorsEmails, licenses) {
        const subject = '🚨 Alerta: Licencias de conducir próximas a vencer';
        let licensesTable = `
      <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Empleado</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Categoría</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Fecha Vencimiento</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Días Restantes</th>
          </tr>
        </thead>
        <tbody>
    `;
        const today = new Date();
        licenses.forEach((license) => {
            const empleadoNombre = license.empleado
                ? `${license.empleado.nombre} ${license.empleado.apellido}`
                : 'Empleado no especificado';
            const vencimiento = new Date(license.fecha_vencimiento);
            const diasRestantes = Math.ceil((vencimiento.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            let rowColor = '';
            if (diasRestantes <= 7) {
                rowColor = 'background-color: #ffcccc;';
            }
            else if (diasRestantes <= 15) {
                rowColor = 'background-color: #fff2cc;';
            }
            licensesTable += `
        <tr style="${rowColor}">
          <td style="padding: 8px; border: 1px solid #ddd;">${empleadoNombre}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${license.categoria}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${vencimiento.toLocaleDateString('es-AR')}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${diasRestantes} días</td>
        </tr>
      `;
        });
        licensesTable += `
        </tbody>
      </table>
    `;
        const body = `
      <p style="font-size: 16px;">¡Atención!</p>
      <p style="font-size: 16px;">Las siguientes licencias de conducir están próximas a vencer:</p>
      ${licensesTable}
      <p style="font-size: 16px; margin-top: 15px;">Por favor, notifique a los empleados afectados para que renueven sus licencias lo antes posible.</p>
    `;
        const htmlContent = this.generateEmailContent(subject, body);
        const safeAdminEmails = adminsEmails || [];
        const safeSupervisorEmails = supervisorsEmails || [];
        const mailOptions = {
            from: process.env.EMAIL_USER || 'notificacion@mva.com',
            to: [...safeAdminEmails, ...safeSupervisorEmails],
            subject,
            html: htmlContent,
        };
        try {
            console.log('📧 Enviando correo de alerta de licencias próximas a vencer...');
            await this.sendMail(mailOptions);
        }
        catch (error) {
            console.error('❌ Error al enviar correo de alerta de licencias', error);
        }
    }
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MailerService);
//# sourceMappingURL=mailer.service.js.map