const { SUCCESS: http } =
  require('../../../../helpers/http-status/status_code');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_modal');
const validator = require('../utils/validator');
const wrapper = require('../../../../helpers/utils/wrapper');

const checkDownload = async (req, res) => {
  const payload = { ...req.query, ...req.body };
  const validatePayload = validator.isValidPayload(payload, commandModel.checkDownload);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.checkDownload(result.data);
  };

  const sendResponse = async (result) => {
    if (result.err) {
      wrapper.response(res, 'fail', result.err, result.message);
    } else {
      wrapper.response(res, 'success', result, 'checking download', http.OK);
    }
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  checkDownload
};
