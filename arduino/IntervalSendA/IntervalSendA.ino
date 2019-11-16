#include "Arduino.h"
#include <HardwareSerial.h>
#include <Interval.h>
#include <SimpleSerialProtocol.h>
#include <dev_printFatalError.h>

const char DEVICE_ID = 'p';
#define BAUDRATE 57600
#define CHARACTER_TIMEOUT 500
const int PIN_LED = 13;

void onFatalError(unsigned int errorNum);
void onInterval();

SimpleSerialProtocol ssp(
        &Serial,
        BAUDRATE,
        CHARACTER_TIMEOUT,
        onFatalError,
        'a',
        'c'
);
Interval interval;


void setup() {
//    Serial.begin(BAUDRATE);
    ssp.init();
    interval.start(2000, onInterval);
}

void loop() {
    ssp.loop();
    interval.loop();
}

void onFatalError(unsigned int errorNum) {
    dev_printFatalError(errorNum, Serial);
}

void onInterval() {
//    Serial.print("got interval ");
    ssp.writeCommand('a');
    ssp.writeEot();
}

