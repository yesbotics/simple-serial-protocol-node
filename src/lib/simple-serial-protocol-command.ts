import {ParamsParser} from "./params-parser";

export class RegisteredCommand {

    private readonly paramsParser: ParamsParser;

    constructor(
        public command: string,
        private callback: (...args: any[]) => void,
        paramTypes: string[] = null
    ) {
        if (paramTypes && paramTypes.length > 0) {
            this.paramsParser = new ParamsParser(paramTypes);
            // console.log("added parser");
        }
    }

    paramsRead() {
        return this.paramsParser ? this.paramsParser.isFull() : true;
    }

    addByte(byte: number) {
        if (this.paramsParser) {
            this.paramsParser.addByte(byte);
        }
    }

    resetParamParser() {
        if (this.paramsParser) {
            this.paramsParser.reset();
        }
    }

    callCallback() {
        if ( this.paramsParser) {
            this.callback.apply(null, this.paramsParser.getData());
        } else {
            this.callback.apply(null, []);
        }
    }

    dispose() {
        this.callback = null;
        if ( this.paramsParser ) {
            this.paramsParser.dispose();
        }
    }
}
