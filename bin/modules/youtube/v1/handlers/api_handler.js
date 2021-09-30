const { SUCCESS: http } =
  require('../../../../helpers/http-status/status_code');
const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_modal');
const validator = require('../utils/validator');

const videoInfo = async (req, res) => {
  const payload = req.query;
  const validatePayload = validator.isValidPayload(payload, commandModel.videoInfo);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.videoInfo(result.data);
  };

  const sendResponse = async (result) => {
    if (result.err) {
      wrapper.response(res, 'fail', result.err, result.message);
    } else {
      wrapper.response(res, 'success', result, 'success get video info', http.OK);
    }
  };
  sendResponse(await postRequest(validatePayload));
};

const download = async (req, res) => {
  const payload = { ...req.query };

  const validatePayload = validator.isValidPayload(payload, commandModel.download);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.download(result.data, res);
  };

  const sendResponse = async (result) => {
    if (typeof result.err !== 'undefined') {
      wrapper.response(res, 'fail', result.err, result.message);
    } else {
      return result;
    }
  };
  sendResponse(await postRequest(validatePayload));
};

const checkDownload = async (req, res) => {
  const { body, query } = req;
  const payload = {
    ...body, ...query
  };
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
  videoInfo,
  download,
  checkDownload
};
