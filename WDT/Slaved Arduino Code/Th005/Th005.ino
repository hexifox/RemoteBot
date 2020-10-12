#include "Wire.h"
#include "DHT.h"
#include "SPI.h"
#define DHTPIN 2     // DHT 22 PIN CONNECTION
#define DHTTYPE DHT11   // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);
#define SLAVE_ADDRESS 0x04
int number = 0;
int state = 0;
int l =0;
int h = 0;
void setup() {
    dht.begin();
    Serial.begin(9600);
    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receiveData);
    Wire.onRequest(sendData);
    Serial.println("Ready");
}
void loop() {
    delay(100);
}
// callback for received data
void receiveData(int byteCount){
    while(Wire.available()) {
        number = Wire.read();
        if (Wire.available() > 1)  // at least 2 bytes
        {
          number = Wire.read() * 256 + Wire.read();
        }
        
     }
}
// callback for sending data
void sendData(){
  if (number == 1){
          l = analogRead(A7);  //Read Luminosity
          l = (-0.10101*l) + 103; 
          Wire.write(l);        
        }
        else if (number == 2){
          h = dht.readHumidity();   // %
          Wire.write(h);
        }
        else{
          Wire.write(0);  
        
        }
    
}





