import threading
import serial
import time
import smbus
import pynmea2
import Adafruit_BMP.BMP085 as BMP085

bus = smbus.SMBus(1)
address = 0x04
sensor = BMP085.BMP085()
serXbee = serial.Serial('/dev/ttyUSB0', 9600)
serGPS = serial.Serial("/dev/ttyAMA0", 9600, timeout=0.5)
sep = ";"
endline = "#"
toSend = ""

startString = 'Start Script'
print 'Sending "%s"' % startString
serXbee.write('%s\n' % startString)


def SendGPS():
    gps = serGPS.readline()
    if gps.find('GGA') > 0:
        ##Parse GPS line into the following parameters:
        msg = pynmea2.parse(gps)
        ##Check if the following variables are holding a value, and if not set it to "0"
        if not msg.lat:
            msg.lat="0";
        if not msg.lat_dir:
            msg.lat_dir="0";
        if not msg.lon:
            msg.lon="0";
        if not msg.lon_dir:
            msg.lon_dir="0";
        toSend = "StrGPSTi;%s;La;%s %s;Lo;%s %s;Alt;%s;#" % (msg.timestamp,msg.lat,msg.lat_dir,msg.lon,msg.lon_dir,msg.altitude)
        print toSend
        serXbee.write('%s\n' % toSend)
        


def SendVal():
    T = 'T:{0:0.2f}'.format(sensor.read_temperature())
    P = 'P:{0:0.2f}'.format(sensor.read_pressure())
    Alt = 'Alt:{0:0.2f}'.format(sensor.read_altitude())
    SL_P = 'SL_P:{0:0.2f}'.format(sensor.read_sealevel_pressure())
    BMP = T + sep + P + sep + Alt + sep + SL_P + sep
    ArdWriteNumber(1)
    LU = ArdReadNumber()
    str(LU)
    l = " l:" + str(LU) + sep
    ArdWriteNumber(2)
    HU = ArdReadNumber()
    str(HU)
    h = " h:" + str(HU) + sep
    rd = "RD:0" + sep
    val = "StrVal" + BMP + l + h + rd + "#"
    serXbee.write(val)
    serXbee.write('\r\n')
    print val
        

def ArdWriteNumber(Value):
    bus.write_byte(address,Value)
    return -1

def ArdReadNumber():
    number = bus.read_byte(address)
    return number


    
while True:
    SendVal()
    SendGPS()
    


print "End of Comms"


    
            
    
    
    
    
    



