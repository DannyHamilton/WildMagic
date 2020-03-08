const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const Hapi = require('hapi');
const inert = require('inert');
const server = new Hapi.Server();
const vision = require('vision');
const ejs = require('ejs');

server.connection({ port: port, host: host });

server.register(inert, (err) => {
    if (err) {
        console.log("Error registering inert: ", err);
        throw err;
    }
    console.log("loaded inert plugin");
    server.register(vision, function (err) {
        if (err) {
            console.log("Error registering vision plugin: ", err);
            throw err;
        }

        console.log("loaded vision plugin");
        server.views({
            engines: { ejs: ejs },
            path: './views', // this is how hapi knows where to look for our views
            isCached: false
        });

        server.start((err) => {
            if (err) {
                console.log("Error registering plugins: ", err);
                throw err;
            } else {
                console.log(`Server running at: ${server.info.uri}`);
            }
        });

    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
       console.log("we made it here");
       reply.view('surgeCheckTool.ejs');
    }
});

