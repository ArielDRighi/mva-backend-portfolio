"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailContent = exports.addSignature = void 0;
exports.addSignature = jest.fn((content) => `${content}<p>Saludos,<br>El equipo de MVA</p>`);
exports.generateEmailContent = jest.fn((title, body) => `
  <div style="font-family: Arial, sans-serif;">
    <h1>${title}</h1>
    <div>${body}</div>
  </div>
`);
//# sourceMappingURL=mailer.utils.mock.js.map