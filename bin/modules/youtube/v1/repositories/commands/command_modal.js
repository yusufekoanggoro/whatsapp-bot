const joi = require('joi');

const videoInfo = joi.object({
  url: joi.string().uri().required()
});

const download = joi.object({
  clientId: joi.string().required(),
  filename: joi.string().required()
});

const checkDownload = joi.object({
  clientId: joi.string().required(),
  url: joi.string().uri().required()
});

const deleteFile = joi.object({
  filename: joi.string().required()
});

module.exports = {
  videoInfo,
  download,
  checkDownload,
  deleteFile
};
