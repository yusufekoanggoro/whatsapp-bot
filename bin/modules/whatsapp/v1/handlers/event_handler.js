const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const helpers = require('../utils/helpers');

const whatsappClient = async () => {
    const client = new Client();

    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    client.on('message', async (msg) => {
        const result = await helpers.nlp(msg.body);
        client.sendMessage(msg.from, result);
    });

    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
        whatsappClient()
    });

    client.initialize();
}

module.exports = {
    whatsappClient 
};