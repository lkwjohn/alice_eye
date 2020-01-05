const fs = require('fs');
const { BASE_PATH } = require('../config');

class folderService {
    checkFolderExist(dirName) {
        if (!fs.existsSync(`${BASE_PATH}/${dirName}`)) {
            fs.mkdirSync(`${BASE_PATH}/${dirName}`);
        }
    }

    move(oldPath, newPath, callback) {

        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                if (err.code === 'EXDEV') {
                    this.copy(oldPath, newPath, callback);
                } else {
                    throw err;
                }
                return;
            }
            callback();
        });
    }

    copy(oldPath, newPath, callback) {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}

module.exports = folderService