const wrapper = require('../../../../../helpers/utils/wrapper');
const helper = require('../../utils/helpers');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');
// const common = require('../../../../../helpers/utils/common');
const uuid = require('uuid');

class Youtube {
  async videoInfo (payload) {
    const { url } = payload;
    const videoInfo = await helper.getVideoInfo(url);
    if (videoInfo.err) {
      return wrapper.error(true, videoInfo.message, 200);
    }
    let { title, duration, thumbnail } = videoInfo.data;
    title = title.replace(/[^\x00-\x7F]/g, '');
    const time = moment().startOf('day')
      .seconds(duration)
      .format('HH:mm:ss');

    return wrapper.data({
      thumbnail,
      duration: `Duration: ${time}`,
      title
    }, 'Success', 200);
  }

  async download (payload, res) {
    let { filename, clientId } = payload;

    const reqPath = path.join(__dirname, `../../../../../../tmp/${clientId}/${filename}.mp3`);
    if (fs.existsSync(reqPath)) {
      const sizeFile = fs.statSync(reqPath).size;
      const filestream = fs.createReadStream(reqPath);

      filename = filename.replace(/[^\x00-\x7F]/g, '');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', sizeFile);

      // filestream.on('data', () => {

      // });
      // filestream.on('end', () => {
      // common.recursiveDeleteDirectory(reqPath);
      // });

      return filestream.pipe(res);
    }
    return wrapper.response(res, 'success', '', 'Not Found', 404);
  }

  async checkDownload (payload) {
    payload.filename = uuid.v1();
    helper.checkDownload(payload);
    return wrapper.data({ filename: `${payload.filename}` }, 'Checking Download', 200);
  }
}

module.exports = Youtube;
