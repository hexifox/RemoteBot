import serial

ser = serial.Serial('/dev/ttyUSB0', 9600
                    )
string = 'Hello From Rasp'
print 'Sending "%s"' % string
ser.write('%s\n' % string)

while True:
    incoming = ser.readline()
    print incoming
    ser.write('RPi Receveid: %s\n' % incoming)
