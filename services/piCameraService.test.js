let PiCamera = require('./piCameraService');
describe('piCameraService', () => {

    let piCamera;

    beforeAll(() => {
        piCamera = new PiCamera();
    })

    xdescribe('recordVideo', () => {

        test('Start record video', () => {
            piCamera.recordVideo();
        })

    });

});