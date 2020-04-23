'use strict'
import Plugins from "./connections/plugins";
const Hapi=require('hapi');
class Server {
    public static async init(): Promise<any> {
        try {
            const uri = 'mongodb://127.0.0.1:27017/TDD';
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            })
            const app = await new Hapi.server({
                host: 'localhost',
                port: 5001,
                routes: {
                    cors:{
                        credentials: true
                    }
                }
            });
            await Plugins.graphql(app);
            //empiezo aplicacion
            const route=require('./connections/routers')
            await app.route(route)
            await app.start();
            console.log('Server running on %s', app.info.uri);
        } catch (error) {
            console.error('here was something wrong:', error);
        }
    }
}
Server.init();
export default Server