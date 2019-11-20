#include "Arduino.h"
#include <HardwareSerial.h>
#include <Interval.h>
#include <SimpleSerialProtocol.h>
#include <dev_printFatalError.h>

const char CHAR = 'c';
#define BAUDRATE 57600
#define CHARACTER_TIMEOUT 500
unsigned int i = 251;

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
    dev_printFatalError(errorNum, Serial);
}

void onInterval() {
    ssp.writeCommand(CHAR);
    ssp.writeUnsignedInt(i);
    ssp.writeEot();
    i++;
    if (i > 255) {
        i = 180;
    }
}

