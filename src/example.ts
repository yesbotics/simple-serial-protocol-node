import {SimpleSerialProtocol} from "./lib/simple-serial-protocol";
import {Baudrate} from "./typings";
import {ParamTypeInt} from "./lib/types/param-type-int";

class Example {

    public static readonly PORTNAME: string = 'COM5';
    public static readonly BAUDRATE: Baudrate = 57600;

    public run(): void {
        let ssp: SimpleSerialProtocol = new SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.registerCommand('a', this.onCommandA);
        ssp.registerCommand('b', this.onCommandInt, [ParamTypeInt.NAME]);
        ssp.init().then(() => {
            console.log('arduino is ready. now sending command "a"');
            // ssp.send('a;');
        }).catch((err) => {
            console.error('could not init', err);
            throw err;
        });
    };

    private onCommandA() {
        console.log('onCommandA');
    }

    private onCommandInt(int: number) {
        console.log("Got int", int);
    }
}

let example = new Example();
example.run();
