const moment = require('moment');
const { exec } = require('child_process');
const PiCamera = require('./services/piCameraService');
const FolderService = require('./services/folderService');
const EmailService = require('./services/emailService');
const mv = require('mv');

let now = moment();
let date = now.format("YYYY-MM-DD");

const piCamera = new PiCamera(now);
const folderService = new FolderService();

try {
    let tmpSource = `/home/pi/alice_eye/tmp/${now.format('HHmm-DD-MM-YYYY')}.h264`;
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

    const moveFile = require('move-file');

    (async () => {
        await moveFile(tmpSource, `/mnt/alice_nas/${now.format('YYYY-MM-DD')}/${now.format('HHmm-DD-MM-YYYY')}.h264`);
        console.log('The file has been moved');
    })();


    // folderService.deleteFile(tmpSource);

}
catch (err) {
    const emailService = new EmailService();
    emailService.sendMessage(`Alice Eyes Find an Error ${err.message}`, err.stack);
    console.log('Alice Eye Error:', err);
}
