const PiCamera = require('pi-camera');
const { RECORD_TIME_IN_MIL_SECONDS } = require('../config')
const { exec } = require('child_process');

class piCamera {

    constructor(now) {
        this.myCamera = new PiCamera({
            mode: 'video',
            output: `/home/pi/alice_eye/tmp/${now.format('HHmm-DD-MM-YYYY')}.h264`,
            width: 480,
            height: 640,
            timeout: RECORD_TIME_IN_MIL_SECONDS ? RECORD_TIME_IN_MIL_SECONDS : 6000, // Record for 5 seconds 2592 1944
            nopreview: true,
        });
    }

    recordVideo(now, date) {
        this.myCamera.record()
            .then(() => {
                exec(`sh /home/pi/alice_eye/shellscript/moveFile.sh ${now.format('HHmm-DD-MM-YYYY')}.h264 ${date}`, (err, stdout, stderr) => {
                    if (err) {
                        throw err;
                    }

                    // the *entire* stdout and stderr (buffered)
                    console.log(`Moving`);
                });
            })
            .catch((error) => {
                console.log('>>>', error)
                throw error;
            });
    }


}


module.exports = piCamera