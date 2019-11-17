import {SimpleSerialProtocol} from "./lib/simple-serial-protocol";
import {Baudrate} from "./typings";
import {ParamTypeInt} from "./lib/types/param-type-int";
import {ParamTypeUnsignedInt} from "./lib/types/param-type-unsigned-int";
import {ParamTypeShort} from "./lib/types/param-type-short";
import {ParamTypeUnsignedShort} from "./lib/types/param-type-unsigned-short";
import {ParamTypeCharArray} from "./lib/types/param-type-char-array";
import {ParamTypeChar} from "./lib/types/param-type-char";
import {ParamTypeFloat} from "./lib/types/param-type-float";
import {ParamTypeLong} from "./lib/types/param-type-long";
import {ParamTypeUnsignedLong} from "./lib/types/param-type-unsigned-long";

class Example {

    public static readonly PORTNAME: string = 'COM5';
    public static readonly BAUDRATE: Baudrate = 57600;

    public run(): void {
        console.log("Starting ssp connection.");
        let ssp: SimpleSerialProtocol = new SimpleSerialProtocol(Example.PORTNAME, Example.BAUDRATE);
        ssp.registerCommand('a', this.onCommandA.bind(this));
        ssp.registerCommand('b', this.onCommandInt.bind(this), [ParamTypeInt.NAME]);
        ssp.registerCommand('c', this.onCommandUint.bind(this), [ParamTypeUnsignedInt.NAME]);
        ssp.registerCommand('d', this.onCommandShort.bind(this), [ParamTypeShort.NAME]);
        ssp.registerCommand('e', this.onCommandUshort.bind(this), [ParamTypeUnsignedShort.NAME]);
        ssp.registerCommand('f', this.onCommandFloat.bind(this), [ParamTypeFloat.NAME]);
        ssp.registerCommand('s', this.onCommandCharArray.bind(this), [ParamTypeCharArray.NAME]);
        ssp.registerCommand('t', this.onCommandChar.bind(this), [ParamTypeChar.NAME]);
        ssp.registerCommand('l', this.onCommandLong.bind(this), [ParamTypeLong.NAME]);
        ssp.registerCommand('m', this.onCommandULong.bind(this), [ParamTypeUnsignedLong.NAME]);
        ssp.registerCommand('x', this.onCommandMultiple.bind(this), [
            ParamTypeInt.NAME,
            ParamTypeCharArray.NAME,
            ParamTypeShort.NAME,
            ParamTypeChar.NAME,
            ParamTypeLong.NAME,
        ]);
        ssp.init().then(() => {
            console.log("Connected.");
            // console.log('arduino is ready. now sending command "a"');
            // ssp.send('a;');
        }).catch((err) => {
            console.error('could not init', err);
            throw err;
        });
    };

    private onCommandMultiple(int: number, string: string, short: number, char: string, long: number) {
        console.log('onCommandMultiple',
            int, string, short, char, long
        );
    }

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

    private onCommandCharArray(string: string) {
        console.log("Got chararray", string);
    }

    private onCommandChar(string: string) {
        console.log("Got char", string);
    }

    private onCommandFloat(f: number) {
        console.log("Got float", f);
    }

    private onCommandLong(f: number) {
        console.log("Got long", f);
    }

    private onCommandULong(f: number) {
        console.log("Got unsigned long", f);
    }
}

let example = new Example();
example.run();
