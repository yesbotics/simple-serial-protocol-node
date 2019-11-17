#include "Arduino.h"
#include <HardwareSerial.h>
#include <Interval.h>
#include <SimpleSerialProtocol.h>
//#include <dev_printFatalError.h>

const char CHAR = 'z';
#define BAUDRATE 57600
#define CHARACTER_TIMEOUT 500
long i = -10;

void onFatalError(unsigned int errorNum);
void onGetData();

SimpleSerialProtocol ssp(
        &Serial,
        BAUDRATE,
        CHARACTER_TIMEOUT,
        onFatalError,
        CHAR,
        CHAR
);

void setup() {
//    Serial.begin(BAUDRATE);
    ssp.init();
    ssp.registerCommand(CHAR, onGetData);
}

void loop() {
    ssp.loop();
}

void onFatalError(unsigned int errorNum) {
//    dev_printFatalError(errorNum, Serial);
}

void onGetData() {
    long data = ssp.readLong();
    ssp.readEot();

    ssp.writeCommand(CHAR);
    ssp.writeLong(data);
    ssp.writeEot();
}

