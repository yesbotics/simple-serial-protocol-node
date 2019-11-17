#include "Arduino.h"
#include <HardwareSerial.h>
#include <Interval.h>
#include <SimpleSerialProtocol.h>
//#include <dev_printFatalError.h>

const char CHAR = 'x';
#define BAUDRATE 57600
#define CHARACTER_TIMEOUT 500

void onFatalError(unsigned int errorNum);
void onInterval();

SimpleSerialProtocol ssp(
        &Serial,
        BAUDRATE,
        CHARACTER_TIMEOUT,
        onFatalError,
        CHAR,
        CHAR
);
Interval interval;


void setup() {
//    Serial.begin(BAUDRATE);
    ssp.init();
    interval.start(1000, onInterval);
}

void loop() {
    ssp.loop();
    interval.loop();
}

void onFatalError(unsigned int errorNum) {
//    dev_printFatalError(errorNum, Serial);
}

void onInterval() {
//ParamTypeInt.NAME,
//ParamTypeString.NAME,
//ParamTypeShort.NAME,
//ParamTypeChar.NAME,
//ParamTypeLong.NAME,

    ssp.writeCommand(CHAR);
    ssp.writeInt(-12);
    ssp.writeCharArray("ein string.");
    ssp.writeShort(746);
    ssp.writeChar('x');
    ssp.writeLong(123456789);
    ssp.writeEot();
}

