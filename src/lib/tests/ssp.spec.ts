import {SimpleSerialProtocol} from "../simple-serial-protocol";

const SerialPort = require('@serialport/stream');
const MockBinding = require('@serialport/binding-mock');

SerialPort.Binding = MockBinding;

MockBinding.createPort('/dev/ROBOT', {echo: true, record: true});

const ssp: SimpleSerialProtocol = new SimpleSerialProtocol("/dev/ROBOT", 9600);

beforeAll(() => {
});

describe("Reading data", () => {

    it("init", async () => {
        expect.assertions(2);
        try {
            await ssp.init(1);
        } catch (e) {
            console.error(e);
        }
        expect(ssp.isOpen()).toBeTruthy();
        expect(ssp.isInitialized()).toBeTruthy();
    });
});
