'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("./connections/plugins");
const Hapi = require('hapi');
class Server {
    static async init() {
        try {
            const uri = 'mongodb://127.0.0.1:27017/TDD';
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            const app = await new Hapi.server({
                host: 'localhost',
                port: 5001,
                routes: {
                    cors: {
                        credentials: true
                    }
                }
            });
            await plugins_1.default.graphql(app);
            //empiezo aplicacion
            const route = require('./connections/routers');
            await app.route(route);
            await app.start();
            console.log('Server running on %s', app.info.uri);
        }
        catch (error) {
            console.error('here was something wrong:', error);
        }
    }
}
Server.init();
exports.default = Server;
//# sourceMappingURL=server.js.map