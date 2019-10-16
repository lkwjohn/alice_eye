const PiCamera = require('pi-camera');
const { RECORD_TIME_IN_MIL_SECONDS } = require('../config')

class piCamera {

    constructor(now) {
        this.myCamera = new PiCamera({
            mode: 'video',
            output: `/mnt/alice_nas/${now.format('HHmm-DD-MM-YYYY')}.h264`,
            width: 730,
            height: 1296,
            timeout: RECORD_TIME_IN_MIL_SECONDS ? RECORD_TIME_IN_MIL_SECONDS : 6000, // Record for 5 seconds 2592 1944
            nopreview: true,
        });
    }

    recordVideo() {
        this.myCamera.record()
            .catch((error) => {
                console.log('>>>', error)
                throw error;
            });
    }


}


module.exports = piCamera