import * as SerialPort from 'serialport';
import * as ByteLength from '@serialport/parser-byte-length';
import {SimpleSerialProtocolError} from "./simple-serial-protocol-error";
import {CommandCallback} from "./simple-serial-protocol-command";
import {Baudrate} from "../typings";
import {ParamType} from "./types/param-type";

export class ParamsParser {
    private types: string[];
    private typeIndex: number;
    private currentType: string;
    private values: any[];
    private byteIndexInValue: number;

    init(types: string[]) {
        this.types = types;
        this.typeIndex = 0;
        this.currentType = this.types[this.typeIndex];
        this.values = [];
        this.byteIndexInValue = 0;
    }

    readByte(byte: string) {
    }

}
