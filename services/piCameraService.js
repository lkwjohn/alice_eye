const PiCamera = require('pi-camera');
const fs = require('fs');

class piCamera {

    constructor() {
        this.myCamera = new PiCamera({
            mode: 'video',
            output: `/mnt/alice_nas/video.h264`,
            width: 1920,
            height: 1080,
            timeout: 5000, // Record for 5 seconds
            nopreview: true,
        });
    }

    recordVideo() {
        this.myCamera.record()
            .then((result) => {
                console.log('>>>', result)
                // Your video was captured
            })
            .catch((error) => {
                console.log('>>>', error)
                // Handle your error
            });
    }


}


module.exports = piCamera