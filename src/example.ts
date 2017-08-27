import {SimpleSerialProtocol} from './lib/simple-serial-protocol';

class Example {

    public static readonly PORTNAME: String = 'COM3';
    public static readonly BAUDRATE: Number = 115200;

    public run = (): void => {
        let ssp: SimpleSerialProtocol = new SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.registerCommand('b', this.onCommandB);
        ssp.registerCommand('c', this.onCommandC);
        ssp.start().then(() => {
            console.log('arduino is ready. now sending command "a;"');
            ssp.send('a;');
        }).catch((err) => {
            throw err;
        });
    };

    private onCommandB(cmdMsg: String) {
        console.log('onCommandB', cmdMsg);
    }

    private onCommandC(cmdMsg: String) {
        console.log('onCommandC', cmdMsg);
    }
}

let example = new Example();
example.run();
