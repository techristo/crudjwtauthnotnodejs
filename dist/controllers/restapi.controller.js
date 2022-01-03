"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestapiController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
let RestapiController = class RestapiController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    async getCharacter(personId) {
        //Preconditions
        return this.peopleService.getCharacter(personId);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/people/{personId}'),
    (0, tslib_1.__param)(0, rest_1.param.path.integer('personId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], RestapiController.prototype, "getCharacter", null);
RestapiController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('services.PeopleService')),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], RestapiController);
exports.RestapiController = RestapiController;
//# sourceMappingURL=restapi.controller.js.map