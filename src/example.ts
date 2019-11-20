import 'source-map-support/register';
import {ParamTypeLong} from "./lib/types/ParamTypeLong";
import {ParamTypeUnsignedLong} from "./lib/types/ParamTypeUnsignedLong";
import {SimpleSerialProtocol} from "./lib/SimpleSerialProtocol";
import {ParamTypeInt} from "./lib/types/ParamTypeInt";
import {ParamTypeUnsignedInt} from "./lib/types/ParamTypeUnsignedInt";
import {ParamTypeShort} from "./lib/types/ParamTypeShort";
import {ParamTypeUnsignedShort} from "./lib/types/ParamTypeUnsignedShort";
import {ParamTypeFloat} from "./lib/types/ParamTypeFloat";
import {ParamTypeCharArray} from "./lib/types/ParamTypeCharArray";
import {ParamTypeChar} from "./lib/types/ParamTypeChar";

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
        ssp.registerCommand('z', this.onCommandDataResponse.bind(this), [ParamTypeLong.NAME]);

        /**
         * Init
         */
        ssp.init().then(() => {
            console.log("Connected.");
            // console.log('arduino is ready. now sending command "a"');

            setTimeout(() => {
                ssp.writeCommand('z', [
                    {type: ParamTypeLong.NAME, value: 123456789}
                ]);
            }, 500);


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

    private onCommandDataResponse(f: number) {
        console.log("Got data response", f);
    }
}

let example = new Example();
example.run();
