const config = require('../infrastructure/configs/global_config');

class User {
  constructor (username, password) {
    this.username = username;
    this.password = password;
  }

  isValidPassword (password) {
    return this.password === password;
  }
}

module.exports.findByUsername = (username, cb) => {
  const userDatas = config.get('/basicAuthApi');

  const userData = userDatas.map((value) => {
    if (value.username === username) {
      return value;
    }
    return '';
  });
  const user = new User(userData[0].username, userData[0].password);
  cb(user);
};
