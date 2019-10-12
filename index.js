const moment = require('moment');
const PiCamera = require('./services/piCameraService');

let now = moment();
let timeStamp = now.format("YYYY-MM-DD HH:mm Z");
let unixTime = now.unix('X');
const piCamera = new PiCamera(unixTime);

try {
    console.log(`Start recording at ${timeStamp}`);
    piCamera.recordVideo();
}
catch (err) {
    console.log('Error ', err)
}
