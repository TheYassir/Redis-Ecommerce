const { createClient } = require('redis');

// * localhost sans docker
//const client = createClient();

// * docker
const client = createClient({
    socket: {
        host: 'redisserver',
        port: 6379,
    },
});
// Si on a un mot de passe
// const client = createClient({ password: 'secret' });

// NE PAS OUBLIER
client.on('error', err => console.log(err));

client
    .connect()
    .then(async () => {
        const pong = await client.ping();

        console.log('REDIS CONNECTED', pong);
    })
    .catch(console.log);

module.exports = client;
