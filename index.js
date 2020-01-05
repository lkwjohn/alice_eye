const moment = require('moment');
const { exec } = require('child_process');
const PiCamera = require('./services/piCameraService');
const FolderService = require('./services/folderService');
const EmailService = require('./services/emailService');
const moveFile = require('move-file');

let now = moment();
let date = now.format("YYYY-MM-DD");

const piCamera = new PiCamera(now);
const folderService = new FolderService();

try {

    console.log(`Start recording at ${now.format("YYYY-MM-DD HH:mm Z")}`);
    exec('sh /home/pi/alice_eye/shellscript/checkAliceNasMount.sh', (err, stdout, stderr) => {
        if (err) {
            throw err;
        }
    });

    folderService.checkFolderExist(date);
    piCamera.recordVideo(now, date);

}
catch (err) {
    const emailService = new EmailService();
    emailService.sendMessage(`Alice Eyes Find an Error ${err.message}`, err.stack);
    console.log('Alice Eye Error:', err);
}
