import {SimpleSerialProtocol} from "../SimpleSerialProtocol";
import {ReadCommandConfig} from "../ReadCommandConfig";

const SerialPort = require('@serialport/stream');
const MockBinding = require('@serialport/binding-mock');

// https://serialport.io/docs/api-binding-mock
SerialPort.Binding = MockBinding;


MockBinding.createPort('/dev/ROBOT', {echo: false, record: true, readyData: ''});

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

    it("registerCommand", async () => {
        // expect.assertions(1);

        const readConfig: ReadCommandConfig = new ReadCommandConfig(
            'a',
            (val: number) => {
            }
        );
        readConfig.addInt8Param();

        ssp.registerCommand(readConfig);
        // expect(ssp.isOpen()).toBeTruthy();
    });
});
