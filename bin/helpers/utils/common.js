const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const deleteDirectoryInTmp = async (name) => {
  const dir = path.join(__dirname, `../../../tmp/${name}`);
  try {
    await fs.rmdirSync(dir, { recursive: true });
  } catch (error) {
    logger.log('delete-directory', `Error while deleting ${dir}.`, 'error');
  }
};

const recursiveDeleteDirectory = async (dir) => {
  try {
    await fs.rmdirSync(dir, { recursive: true });
  } catch (error) {
    logger.log('delete-directory', `Error while deleting ${dir}.`, 'error');
  }
};

const makeDirectoryInTmp = async (name) => {
  const dir = path.join(__dirname, `../../../tmp/${name}`);
  try {
    if (!await fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
    }
    return true;
  } catch (error) {
    logger.log('delete-directory', error.message, 'error');
    return false;
  }
};

module.exports = {
  deleteDirectoryInTmp,
  makeDirectoryInTmp,
  recursiveDeleteDirectory
};
