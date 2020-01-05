const fs = require('fs');
const { BASE_PATH } = require('../config');
const mv = require('mv');

class folderService {
    checkFolderExist(dirName) {
        if (!fs.existsSync(`${BASE_PATH}/${dirName}`)) {
            fs.mkdirSync(`${BASE_PATH}/${dirName}`);
        }
    }


    deleteFile(path) {
        try {
            fs.unlinkSync(path)
        } catch (err) {
            console.log(`${path} not exist`)
        }

    }
}


module.exports = folderService