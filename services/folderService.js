const fs = require('fs');
const { BASE_PATH } = require('../config');

class folderService {
    checkFolderExist(dirName) {
        if (!fs.existsSync(`${BASE_PATH}/${dirName}`)) {
            fs.mkdirSync(`${BASE_PATH}/${dirName}`);
        }
    }
}

module.exports = folderService