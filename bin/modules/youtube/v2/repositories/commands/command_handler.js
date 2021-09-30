const Youtube = require('./domain');

const checkDownload = async (payload) => {
  const youtube = new Youtube();
  const postCommand = async (payload) => youtube.checkDownload(payload);
  return postCommand(payload);
};

module.exports = {
  checkDownload
};
