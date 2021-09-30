const youtubedl = require('youtube-dl-exec');
const path = require('path');
const getSocket = require('../../../../infrastructure/socket.io/connection').getSocket;
const logger = require('../../../../helpers/utils/logger');

const checkDownload = async (payload) => {
  try {
    const { url, clientId, filename } = payload;
    const dir = path.join(__dirname, `../../../../../tmp/${clientId}`);
    await youtubedl(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      audioQuality: 0,
      output: `${filename}.mp3`
    }, { cwd: dir });

    getSocket().to(clientId).emit('statusCheckDownload', {
      isLoading: false
    });
  } catch (error) {
    logger.log('checkDownload', error, 'error');
  }
};

module.exports = {
  checkDownload
};
