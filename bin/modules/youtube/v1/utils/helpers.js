const ytdl = require('ytdl-core');
const logger = require('../../../../helpers/utils/logger');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const youtubedl = require('youtube-dl-exec');
const wrapper = require('../../../../helpers/utils/wrapper');
const path = require('path');
const fs = require('fs');
const getSocket = require('../../../../infrastructure/socket.io/connection').getSocket;

const getVideoInfo = async (url) => {
  try {
    const response = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: url
    });
    return wrapper.data(response, 'success', 200);
  } catch (error) {
    const err = JSON.parse(JSON.stringify(error));
    return wrapper.error('fail', err.stderr, 500);
  }
};

const getStream = async (url, res) => {
  logger.log('getStream', `Downloading from ${url} ...`);
  return new Promise((resolve, reject) => {
    const stream = ytdl(url, {
      quality: 'highest',
      filter: (format) => format.container === 'mp4'
    }).on('end', () => {
      logger.log('getStream', 'Successfully downloaded the stream!');
    }).on('error', (err) => {
      logger.log('getStream', err.message);
    });
    return resolve(stream);
  });
};

const convertToMp3 = async (stream, title, res) => {
  return new Promise((resolve, reject) => {
    ffmpeg({ source: stream })
      .toFormat('mp3')
      .on('error', (err) => {
        logger.log('error', err.message);
      })
      .on('end', () => {
        logger.log('convertToMp3', 'Successfully downloaded the audio!');
        resolve();
      })
      .on('close', () => {
        logger.log('convertToMp3', 'stream closed', 'info');
      })
      .pipe(res, { end: true });
  });
};

const checkDownload = async (payload) => {
  const { url, clientId, filename } = payload;
  const reqPath = path.join(__dirname, `../../../../../tmp/${clientId}/${filename}.mp3`);
  const videoReadableStream = ytdl(url, {
    quality: 'highestaudio',
    filter: 'audioonly'
  });
  const videoWritableStream = fs.createWriteStream(reqPath);
  const stream = videoReadableStream.pipe(videoWritableStream);
  stream.on('error', (err) => {
    logger.log('checkDownload', err.message, 'error');
  });
  stream.on('finish', () => {
    getSocket().to(clientId).emit('statusCheckDownload', {
      isLoading: false
    });
    logger.log('checkDownload', `finish - ${clientId}`, 'info');
  });
};

module.exports = {
  getVideoInfo,
  getStream,
  convertToMp3,
  checkDownload
};
