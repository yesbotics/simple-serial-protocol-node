#include "Arduino.h"
#include <HardwareSerial.h>
#include <Interval.h>
#include <SimpleSerialProtocol.h>

const char CHAR = 'f';
#define BAUDRATE 57600
#define CHARACTER_TIMEOUT 200
float f = -1.0;

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
    ssp.writeCommand(CHAR);
    ssp.writeFloat(f);
    ssp.writeEot();
    f += 0.123;
    if (f > 3000) {
        f = -1.0;
    }
}

