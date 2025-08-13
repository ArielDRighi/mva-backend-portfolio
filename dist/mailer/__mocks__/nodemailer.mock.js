"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetMocks = exports.createTransport = exports.mockSendMail = void 0;
exports.mockSendMail = jest
    .fn()
    .mockImplementation(() => Promise.resolve());
const mockTransporter = {
    sendMail: exports.mockSendMail,
    verify: jest.fn().mockImplementation(() => Promise.resolve(true)),
};
exports.createTransport = jest
    .fn()
    .mockImplementation(() => mockTransporter);
const resetMocks = () => {
    exports.mockSendMail.mockClear();
    exports.createTransport.mockClear();
};
exports.resetMocks = resetMocks;
//# sourceMappingURL=nodemailer.mock.js.map