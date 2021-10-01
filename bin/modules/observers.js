
const whatsappEventHandler = require('./whatsapp/v1/handlers/event_handler');
const logger = require('../helpers/utils/logger');

const init = () => {
  logger.log('info', 'Observer is Running...', 'myEmitter.init');
  initEventListener();
};
const initEventListener = () => {
    whatsappEventHandler.whatsappClient();
};

module.exports = {
  init: init
};
