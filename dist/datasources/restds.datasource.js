"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestdsDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'restds',
    connector: 'rest',
    baseURL: 'https://swapi.dev/api/',
    crud: false,
    options: {
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
    },
    operations: [
        {
            template: {
                method: 'GET',
                url: 'https://swapi.dev/api/people/{personId}',
            },
            functions: {
                getCharacter: ['personId'],
            },
        },
    ],
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let RestdsDataSource = class RestdsDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
RestdsDataSource.dataSourceName = 'restds';
RestdsDataSource.defaultConfig = config;
RestdsDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.restds', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], RestdsDataSource);
exports.RestdsDataSource = RestdsDataSource;
//# sourceMappingURL=restds.datasource.js.map