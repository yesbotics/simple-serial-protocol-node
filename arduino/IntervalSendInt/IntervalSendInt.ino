#include "Arduino.h"
#include <HardwareSerial.h>
#include <Interval.h>
#include <SimpleSerialProtocol.h>
#include <dev_printFatalError.h>

const char DEVICE_ID = 'p';
#define BAUDRATE 57600
#define CHARACTER_TIMEOUT 500
const int PIN_LED = 13;
int i = -10;

void onFatalError(unsigned int errorNum);
void onInterval();

SimpleSerialProtocol ssp(
        &Serial,
        BAUDRATE,
        CHARACTER_TIMEOUT,
        onFatalError,
        'b',
        'b'
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
    ssp.writeCommand('b');
    ssp.writeInt(i);
    ssp.writeEot();
    i++;
    if (i > 255) {
        i = -255;
    }
}

