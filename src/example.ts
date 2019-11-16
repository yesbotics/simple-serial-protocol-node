import {SimpleSerialProtocol} from "./lib/simple-serial-protocol";
import {Baudrate} from "./typings";
import {ParamTypeInt} from "./lib/types/param-type-int";
import {ParamTypeUnsignedInt} from "./lib/types/param-type-unsigned-int";
import {ParamTypeShort} from "./lib/types/param-type-short";
import {ParamTypeUnsignedShort} from "./lib/types/param-type-unsigned-short";
import {ParamTypeString} from "./lib/types/param-type-string";

class Example {

    public static readonly PORTNAME: string = 'COM5';
    public static readonly BAUDRATE: Baudrate = 57600;

    public run(): void {
        let ssp: SimpleSerialProtocol = new SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.registerCommand('a', this.onCommandA);
        ssp.registerCommand('b', this.onCommandInt, [ParamTypeInt.NAME]);
        ssp.registerCommand('c', this.onCommandUint, [ParamTypeUnsignedInt.NAME]);
        ssp.registerCommand('d', this.onCommandShort, [ParamTypeShort.NAME]);
        ssp.registerCommand('e', this.onCommandUshort, [ParamTypeUnsignedShort.NAME]);
        ssp.registerCommand('s', this.onCommandString, [ParamTypeString.NAME]);
        ssp.init().then(() => {
            // console.log('arduino is ready. now sending command "a"');
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

    private onCommandUint(uint: number) {
        console.log("Got uint", uint);
    }

    private onCommandShort(short: number) {
        console.log("Got short", short);
    }

    private onCommandUshort(ushort: number) {
        console.log("Got ushort", ushort);
    }

    private onCommandString(string: number) {
        console.log("Got string", string);
    }
}

let example = new Example();
example.run();
