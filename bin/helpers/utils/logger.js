const winston = require('winston');
const config = winston.config;
const st = require('stack-trace');
const moment = require('moment-timezone');
moment.tz('Asia/Jakarta');

const myconfig = {
  levels: {
    trace: 9,
    input: 8,
    verbose: 7,
    prompt: 6,
    debug: 5,
    info: 4,
    data: 3,
    help: 2,
    warn: 1,
    error: 0
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta'
  }
};

const logger = new (winston.Logger)({
  // thanks to https://github.com/winstonjs/winston/issues/1135
  transports: [new winston.transports.Console({
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: function () {
      const dateString = moment().format('YYYY-MM-DD HH:mm:ss');
      return dateString;
    },
    formatter: function (options) {
      return options.timestamp() + ' [' + config.colorize(options.level, options.level.toLowerCase()) + ']: ' + options.message;
    }
  })
  ],
  levels: myconfig.levels,
  exitOnError: false
});

const log = (context, message, scope) => {
  const msg = `(${context}) - ${message} => [${st.get()[1].getFileName()}:${st.get()[1].getLineNumber()}]`;
  if (scope === 'error') {
    logger.error(msg);
  } else {
    logger.info(msg);
  }
};

module.exports = {
  log
};
