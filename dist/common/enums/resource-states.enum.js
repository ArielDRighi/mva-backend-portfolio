"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceType = exports.ServiceState = exports.ResourceState = void 0;
var ResourceState;
(function (ResourceState) {
    ResourceState["DISPONIBLE"] = "DISPONIBLE";
    ResourceState["ASIGNADO"] = "ASIGNADO";
    ResourceState["MANTENIMIENTO"] = "MANTENIMIENTO";
    ResourceState["FUERA_DE_SERVICIO"] = "FUERA_DE_SERVICIO";
    ResourceState["BAJA"] = "BAJA";
    ResourceState["VACACIONES"] = "VACACIONES";
    ResourceState["LICENCIA"] = "LICENCIA";
    ResourceState["INACTIVO"] = "INACTIVO";
    ResourceState["EN_CAPACITACION"] = "EN_CAPACITACION";
    ResourceState["RESERVADO"] = "RESERVADO";
})(ResourceState || (exports.ResourceState = ResourceState = {}));
var ServiceState;
(function (ServiceState) {
    ServiceState["PROGRAMADO"] = "PROGRAMADO";
    ServiceState["EN_PROGRESO"] = "EN_PROGRESO";
    ServiceState["COMPLETADO"] = "COMPLETADO";
    ServiceState["CANCELADO"] = "CANCELADO";
    ServiceState["SUSPENDIDO"] = "SUSPENDIDO";
    ServiceState["INCOMPLETO"] = "INCOMPLETO";
})(ServiceState || (exports.ServiceState = ServiceState = {}));
var ServiceType;
(function (ServiceType) {
    ServiceType["INSTALACION"] = "INSTALACION";
    ServiceType["RETIRO"] = "RETIRO";
    ServiceType["LIMPIEZA"] = "LIMPIEZA";
    ServiceType["MANTENIMIENTO"] = "MANTENIMIENTO";
    ServiceType["REPARACION"] = "REPARACION";
    ServiceType["REUBICACION"] = "REUBICACION";
    ServiceType["REEMPLAZO"] = "REEMPLAZO";
    ServiceType["MANTENIMIENTO_IN_SITU"] = "MANTENIMIENTO_IN_SITU";
    ServiceType["TRASLADO"] = "TRASLADO";
    ServiceType["CAPACITACION"] = "CAPACITACION";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
//# sourceMappingURL=resource-states.enum.js.map