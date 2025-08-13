"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendServiceNotification = exports.sendSurveyNotification = exports.sendClaimNotification = exports.sendCompletionNotification = exports.sendInProgressNotification = exports.sendRouteModified = exports.sendRoute = void 0;
exports.addSignature = addSignature;
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config({
    path: '.env',
});
function addSignature(content) {
    return `${content}<p>Saludos,<br>El equipo de MVA</p>`;
}
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Faltan las variables de entorno EMAIL_USER o EMAIL_PASS');
    process.exit(1);
}
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
function generateEmailContent(title, body) {
    return addSignature(`
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #7E3AF2; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">${title}</h1>
      </div>
      <div style="padding: 20px;">
        ${body}
      </div>
      <div style="background-color: #f4f4f4; color: #777; padding: 10px; text-align: center; font-size: 14px;">
        <p style="margin: 0;">© 2025 MVA SRL. Todos los derechos reservados.</p>
      </div>
    </div>
  `);
}
const sendRoute = async (email, name, vehicle, toilets, clients, serviceType, taskDate) => {
    const subject = '🚚 ¡Nueva ruta de trabajo asignada!';
    const body = `
    <p style="font-size: 16px;">¡Hola ${name}!</p>
    <p style="font-size: 16px;">Se te ha asignado una nueva ruta de trabajo para el día <strong>${taskDate}</strong>.</p>
    <p style="font-size: 16px;">Detalles de la ruta:</p>
    <ul>
      <li><strong>Vehículo a utilizar:</strong> ${vehicle}</li>
      <li><strong>Tipo de servicio:</strong> ${serviceType}</li>
      <li><strong>Baños a trasladar o mantener:</strong></li>
      <ul>
        ${toilets.map((toilet) => `<li>${toilet}</li>`).join('')}
      </ul>
      <li><strong>Clientes a visitar:</strong></li>
      <ul>
        ${clients.map((client) => `<li>${client}</li>`).join('')}
      </ul>
    </ul>
    <p style="font-size: 16px;">¡Gracias por tu compromiso y buen trabajo!</p>
  `;
    const htmlContent = generateEmailContent('¡Nueva ruta de trabajo asignada!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${email}`);
    }
    catch (error) {
        console.error(`Error al enviar el correo a ${email}`, error);
    }
};
exports.sendRoute = sendRoute;
const sendRouteModified = async (email, name, vehicle, toilets, clients, serviceType, taskDate) => {
    const subject = '🔔 ¡Tu ruta asignada sufrió modificaciones!';
    const body = `
    <p style="font-size: 16px;">¡Hola ${name}!</p>
    <p style="font-size: 16px;">Queremos informarte que tu ruta asignada ha sido actualizada para el día <strong>${taskDate}</strong>.</p>
    <p style="font-size: 16px;">Aquí están los detalles de la nueva ruta asignada:</p>
    <ul>
      <li><strong>Vehículo asignado:</strong> ${vehicle}</li>
      <li><strong>Tipo de servicio:</strong> ${serviceType}</li>
      <li><strong>Baños a trasladar o mantener:</strong></li>
      <ul>
        ${toilets.map((toilet) => `<li>${toilet}</li>`).join('')}
      </ul>
      <li><strong>Clientes a visitar:</strong></li>
      <ul>
        ${clients.map((client) => `<li>${client}</li>`).join('')}
      </ul>
    </ul>
    <p style="font-size: 16px;">Asegúrate de revisar los cambios y estar preparado para la nueva ruta. ¡Gracias por tu trabajo!</p>
  `;
    const htmlContent = generateEmailContent('¡Tu ruta asignada sufrió modificaciones!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo de modificaciones enviado a ${email}`);
    }
    catch (error) {
        console.error(`Error al enviar el correo de modificaciones a ${email}`, error);
    }
};
exports.sendRouteModified = sendRouteModified;
const sendInProgressNotification = async (adminsEmails, supervisorsEmails, employeeName, taskDetails) => {
    const subject = '🚚 ¡El trabajo asignado ha comenzado!';
    const body = `
    <p style="font-size: 16px;">¡Hola!</p>
    <p style="font-size: 16px;">El trabajo asignado a <strong>${employeeName}</strong> ha <strong>comenzado</strong> según lo programado.</p>
    <p style="font-size: 16px;">Aquí están los detalles de la tarea en curso:</p>
    <ul>
      <li><strong>Cliente:</strong> ${taskDetails.client}</li>
      <li><strong>Vehículo utilizado:</strong> ${taskDetails.vehicle}</li>
      <li><strong>Tipo de servicio:</strong> ${taskDetails.serviceType}</li>
      <li><strong>Baños asignados:</strong> ${taskDetails.toilets.join(', ')}</li>
      <li><strong>Fecha de inicio:</strong> ${taskDetails.taskDate}</li>
    </ul>
    <p style="font-size: 16px;">Este mensaje es solo informativo. Gracias por tu atención.</p>
  `;
    const htmlContent = generateEmailContent('¡Tarea en curso!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [...adminsEmails, ...supervisorsEmails],
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('📨 Correo de tarea en progreso enviado');
    }
    catch (error) {
        console.error('❌ Error al enviar el correo de tarea en progreso', error);
    }
};
exports.sendInProgressNotification = sendInProgressNotification;
const sendCompletionNotification = async (adminsEmails, supervisorsEmails, employeeName, taskDetails) => {
    const subject = '✔️ ¡El trabajo asignado fue completado con éxito!';
    const body = `
    <p style="font-size: 16px;">¡Hola!</p>
    <p style="font-size: 16px;">El trabajo asignado a <strong>${employeeName}</strong> ha sido completado con éxito.</p>
    <p style="font-size: 16px;">Detalles de la tarea completada:</p>
    <ul>
      <li><strong>Cliente visitado:</strong> ${taskDetails.client}</li>
      <li><strong>Vehículo utilizado:</strong> ${taskDetails.vehicle}</li>
      <li><strong>Servicio realizado:</strong> ${taskDetails.serviceType}</li>
      <li><strong>Baños atendidos:</strong> ${taskDetails.toilets.join(', ')}</li>
      <li><strong>Fecha de ejecución:</strong> ${taskDetails.taskDate}</li>
    </ul>
    <p style="font-size: 16px;">Gracias por tu atención.</p>
  `;
    const htmlContent = generateEmailContent('¡Trabajo completado con éxito!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [...adminsEmails, ...supervisorsEmails],
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de notificación de tarea completada enviado');
    }
    catch (error) {
        console.error('Error al enviar el correo de notificación de tarea completada', error);
    }
};
exports.sendCompletionNotification = sendCompletionNotification;
const sendClaimNotification = async (adminsEmails, supervisorsEmails, clientName, claimTitle, claimDescription, claimType, claimDate) => {
    const subject = '📝 ¡Nuevo reclamo recibido!';
    const body = `
    <p style="font-size: 16px;">¡Hola!</p>
    <p style="font-size: 16px;">Se ha recibido un nuevo reclamo de <strong>${clientName}</strong>.</p>
    <p style="font-size: 16px;">Detalles del reclamo:</p>
    <ul>
    <li><strong>Titulo:</strong> ${claimTitle}</li>
      <li><strong>Tipo de reclamo:</strong> ${claimType}</li>
      <li><strong>Descripción:</strong> ${claimDescription}</li>
      <li><strong>Fecha del reclamo:</strong> ${claimDate}</li>

    </ul>
    <p style="font-size: 16px;">Gracias por tu atención.</p>
  `;
    const htmlContent = generateEmailContent('¡Nuevo reclamo recibido!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [...adminsEmails, ...supervisorsEmails],
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('📨 Correo de reclamo enviado');
    }
    catch (error) {
        console.error('❌ Error al enviar el correo de reclamo', error);
    }
};
exports.sendClaimNotification = sendClaimNotification;
const sendSurveyNotification = async (adminsEmails, supervisorsEmails, clientName, maintenanceDate, surveyRating, surveyComments, surveyAsunto, evaluatedAspects) => {
    const subject = '⭐ ¡Nueva encuesta de satisfacción recibida!';
    const body = `
    <p style="font-size: 16px;">¡Hola!</p>
    <p style="font-size: 16px;">Se ha recibido una nueva encuesta de satisfacción de <strong>${clientName}</strong>.</p>
    <p style="font-size: 16px;">Detalles de la encuesta:</p>
    <ul>
      <li><strong>Nombre del cliente:</strong> ${clientName}</li>
      <li><strong>Fecha de Mantenimiento:</strong> ${maintenanceDate}</li>
      <li><strong>Calificación general:</strong> ${surveyRating}</li>
      <li><strong>Comentarios:</strong> ${surveyComments}</li>
      <li><strong>Asunto:</strong> ${surveyAsunto}</li>
      <li><strong>Aspecto Evaluado:</strong> ${evaluatedAspects}</li>
    </ul>
    <p style="font-size: 16px;">Gracias por tu atención.</p>
  `;
    const htmlContent = generateEmailContent('¡Nueva encuesta de satisfacción recibida!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [...adminsEmails, supervisorsEmails],
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('📨 Correo de encuesta de satisfacción enviado');
    }
    catch (error) {
        console.error('❌ Error al enviar el correo de encuesta de satisfacción', error);
    }
};
exports.sendSurveyNotification = sendSurveyNotification;
const sendServiceNotification = async (adminsEmails, supervisorsEmails, nombrePersona, rolPersona, email, telefono, nombreEmpresa, cuit, rubroEmpresa, zonaDireccion, cantidadBaños, tipoEvento, duracionAlquiler, comentarios) => {
    const subject = '🛠️ ¡Nueva solicitud de servicio recibida!';
    const body = `
    <p style="font-size: 16px;">¡Hola!</p>
    <p style="font-size: 16px;">Se ha recibido una nueva solicitud de servicio.</p>
    <p style="font-size: 16px;">Detalles del cliente:</p>
    <ul>
      <li><strong>Nombre de la persona:</strong> ${nombrePersona}</li>
      <li><strong>Rol de la persona:</strong> ${rolPersona}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Teléfono:</strong> ${telefono}</li>
    </ul>
    <p style="font-size: 16px;">Detalles de la empresa:</p>
    <ul>
      <li><strong>Nombre de la empresa:</strong> ${nombreEmpresa}</li>
      <li><strong>CUIT:</strong> ${cuit}</li>
      <li><strong>Rubro de la empresa:</strong> ${rubroEmpresa}</li>
      <li><strong>Zona de dirección:</strong> ${zonaDireccion}</li>
    </ul>
    <p style="font-size: 16px;">Detalles del servicio:</p>
    <ul>
      <li><strong>Cantidad de baños:</strong> ${cantidadBaños}</li>
      <li><strong>Tipo de evento:</strong> ${tipoEvento}</li>
      <li><strong>Duración del alquiler:</strong> ${duracionAlquiler}</li>
      <li><strong>Comentarios:</strong> ${comentarios}</li>
    </ul>
    <p style="font-size: 16px;">Gracias por tu atención.</p>
  `;
    const htmlContent = generateEmailContent('¡Nueva solicitud de servicio recibida!', body);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [...adminsEmails, supervisorsEmails],
        subject,
        html: htmlContent,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('📨 Correo de solicitud de servicio enviado');
    }
    catch (error) {
        console.error('❌ Error al enviar el correo de solicitud de servicio', error);
    }
};
exports.sendServiceNotification = sendServiceNotification;
//# sourceMappingURL=nodemailer.js.map