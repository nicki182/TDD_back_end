'use strict';
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
                port: 5000
            });
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
