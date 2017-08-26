import {SimpleSerialProtocol} from "./lib/simple-serial-protocol";

class Example {
    public static readonly PORTNAME: String = 'COM4';
    public static readonly BAUDRATE: Number = 115200;

    public run = (): void => {
        let ssp: SimpleSerialProtocol = new SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.start().then(() => {
            setTimeout(() => {
                console.log('ddmmm');
                // ssp.send('a;');
            }, 1000);
        }).catch((err) => {
            throw err;
        });
    };
}

let example = new Example();
example.run();