const moment = require('moment');
const { exec } = require('child_process');
const PiCamera = require('./services/piCameraService');
const FolderService = require('./services/folderService');
const EmailService = require('./services/emailService');

let now = moment();
let date = now.format("YYYY-MM-DD");

const piCamera = new PiCamera(now);
const folderService = new FolderService();

try {
    console.log(`Start recording at ${now.format("YYYY-MM-DD HH:mm Z")}`);
    exec('sh shellscript/checkAliceNasMount.sh', (err, stdout, stderr) => {
        if (err) {
            throw err;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });

    folderService.checkFolderExist(date);
    piCamera.recordVideo(now);
}
catch (err) {
    const emailService = new EmailService();
    emailService.sendMessage(`Alice Eyes Find an Error ${err.message}`, err.stack);
    console.log('Alice Eye Error:', err);
}
