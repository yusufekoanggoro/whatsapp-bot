const Youtube = require('./domain');

const videoInfo = async (payload) => {
  const youtube = new Youtube();
  const postCommand = async payload => youtube.videoInfo(payload);
  return postCommand(payload);
};

const download = async (payload, res) => {
  const youtube = new Youtube();
  const postCommand = async (payload, res) => youtube.download(payload, res);
  return postCommand(payload, res);
};

const checkDownload = async (payload) => {
  const youtube = new Youtube();
  const postCommand = async (payload) => youtube.checkDownload(payload);
  return postCommand(payload);
};

const deleteFile = async (payload) => {
  const youtube = new Youtube();
  const postCommand = async (payload) => youtube.deleteFile(payload);
  return postCommand(payload);
};

module.exports = {
  videoInfo,
  download,
  checkDownload,
  deleteFile
};
