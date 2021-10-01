const { Client } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
const helpers = require('../utils/helpers');
const getSocket = require('../../../../infrastructure/socket.io/connection').getSocket;

const whatsappClient = async () => {
    const client = new Client({ puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}});

    client.on('qr', (qr) => {
        // qrcode.generate(qr, {small: true});
        getSocket().emit('qrcode', {
            qr: qr,
            text: 'qrcode generated successfully'
        });
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
        getSocket().emit('statusAuth', {
            text: 'Status: Logged'
        });
    });
    
    client.on('message', async (msg) => {
        const result = await helpers.nlp(msg.body);
        client.sendMessage(msg.from, result);
    });

    client.on('disconnected', (reason) => {
        console.log('Client was logged out', reason);
        getSocket().emit('statusAuth', {
            text: 'Status: logout'
        });
        whatsappClient()

    });

    client.initialize();
}

module.exports = {
    whatsappClient 
};