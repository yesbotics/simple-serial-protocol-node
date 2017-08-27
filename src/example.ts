import {SimpleSerialProtocol} from "./lib/simple-serial-protocol";

class Example {
    public static readonly PORTNAME: String = 'COM3';
    public static readonly BAUDRATE: Number = 115200;

    public run = (): void => {
        let ssp: SimpleSerialProtocol = new SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.start().then(() => {
            console.log('arduino is ready');
            ssp.send('a;');
        }).catch((err) => {
            throw err;
        });
    };
}

let example = new Example();
example.run();