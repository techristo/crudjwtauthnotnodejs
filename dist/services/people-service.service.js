"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleServiceProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const datasources_1 = require("../datasources");
let PeopleServiceProvider = class PeopleServiceProvider {
    constructor(
    // restds must match the name property in the datasource json file
    dataSource = new datasources_1.RestdsDataSource()) {
        this.dataSource = dataSource;
    }
    value() {
        return (0, service_proxy_1.getService)(this.dataSource);
    }
};
PeopleServiceProvider = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.restds')),
    (0, tslib_1.__metadata)("design:paramtypes", [datasources_1.RestdsDataSource])
], PeopleServiceProvider);
exports.PeopleServiceProvider = PeopleServiceProvider;
//# sourceMappingURL=people-service.service.js.map