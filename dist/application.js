"use strict";
// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListApplication = exports.NotificationServiceApplication = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authentication_jwt_1 = require("@loopback/authentication-jwt");
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const datasources_1 = require("./datasources");
const sequence_1 = require("./sequence");
const loopback4_notifications_1 = require("loopback4-notifications");
//Push notifications AWS email notifications SES
class NotificationServiceApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super();
        this.component(loopback4_notifications_1.NotificationsComponent);
        this.bind(loopback4_notifications_1.NotificationBindings.Config).to({
            sendToMultipleReceivers: false,
            senderEmail: 'support@myapp.com'
        });
        this.bind(loopback4_notifications_1.SESBindings.Config).to({
            accessKeyId: process.env.SES_ACCESS_KEY_ID,
            secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
            region: process.env.SES_REGION,
        });
        this.bind(loopback4_notifications_1.NotificationBindings.EmailProvider).toProvider(loopback4_notifications_1.SesProvider);
    }
}
exports.NotificationServiceApplication = NotificationServiceApplication;
class TodoListApplication extends (0, boot_1.BootMixin)((0, service_proxy_1.ServiceMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        // ------ ADD SNIPPET AT THE BOTTOM ---------
        // Mount authentication system
        this.component(authentication_1.AuthenticationComponent);
        // Mount jwt component
        this.component(authentication_jwt_1.JWTAuthenticationComponent);
        // Bind datasource
        this.dataSource(datasources_1.DbDataSource, authentication_jwt_1.UserServiceBindings.DATASOURCE_NAME);
        // ------------- END OF SNIPPET -------------
        //new
        this.bind(authentication_jwt_1.UserServiceBindings.USER_SERVICE).toClass(authentication_jwt_1.MyUserService);
    }
}
exports.TodoListApplication = TodoListApplication;
//# sourceMappingURL=application.js.map