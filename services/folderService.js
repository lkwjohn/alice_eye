const fs = require('fs');

class folderService {
    checkFolderExist(dirName) {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }
    }
}

module.exports = folderService