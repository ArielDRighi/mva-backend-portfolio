"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicionesContractuales = exports.EstadoContrato = exports.Periodicidad = void 0;
var Periodicidad;
(function (Periodicidad) {
    Periodicidad["DIARIA"] = "Diaria";
    Periodicidad["SEMANAL"] = "Semanal";
    Periodicidad["MENSUAL"] = "Mensual";
    Periodicidad["ANUAL"] = "Anual";
})(Periodicidad || (exports.Periodicidad = Periodicidad = {}));
var EstadoContrato;
(function (EstadoContrato) {
    EstadoContrato["ACTIVO"] = "Activo";
    EstadoContrato["INACTIVO"] = "Inactivo";
    EstadoContrato["TERMINADO"] = "Terminado";
})(EstadoContrato || (exports.EstadoContrato = EstadoContrato = {}));
class CondicionesContractuales {
}
exports.CondicionesContractuales = CondicionesContractuales;
exports.default = {
    CondicionesContractuales,
    Periodicidad,
    EstadoContrato,
};
//# sourceMappingURL=contractual_conditions.entity.js.map