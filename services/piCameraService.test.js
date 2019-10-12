let PiCamera = require('./piCameraService');
describe('piCameraService', () => {

    let piCamera;

    beforeAll(() => {
        piCamera = new PiCamera();
    })

    describe('recordVideo', () => {

        test('Start record video', () => {
            piCamera.recordVideo();
        })

    });

});