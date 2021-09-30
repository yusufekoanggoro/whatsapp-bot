const wrapper = require('../../../../../helpers/utils/wrapper');
const helper = require('../../utils/helpers');
const uuid = require('uuid');

class Youtube {
  async checkDownload (payload) {
    payload.filename = uuid.v1();
    helper.checkDownload(payload);
    return wrapper.data({ filename: `${payload.filename}` }, 'Checking Download', 200);
  }
}

module.exports = Youtube;
