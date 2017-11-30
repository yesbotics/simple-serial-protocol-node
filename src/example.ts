import {SimpleSerialProtocol} from './lib/simple-serial-protocol';
import {CommandMessage} from './lib/command-message';

class Example {

    public static readonly PORTNAME: string = 'COM3';
    public static readonly BAUDRATE: number = 115200;

    public run(): void {
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

    private onCommandB(cmdMsg: CommandMessage) {
        console.log('onCommandB', cmdMsg.getMessageString());
    }

    private onCommandC(cmdMsg: CommandMessage) {
        console.log('onCommandC', cmdMsg.getMessageString());
    }
}

let example = new Example();
example.run();
