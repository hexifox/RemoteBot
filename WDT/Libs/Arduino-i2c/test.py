import smbus
import time
bus = smbus.SMBus(1)

address = 0x04

def writeNumber(Value):
    bus.write_byte(address,Value)
    return -1

def readNumber():
    number = bus.read_byte(address)
    return number

while True:
    try:
        var = int(raw_input("Enter 1-9: "))
    except ValueError:
        print "What ?"
        continue

    writeNumber(var)
    print "Rpi sent ", var
    time.sleep(0.5)

    number = readNumber()
    if var == 1:
        print "l: ", number
    elif var == 2:
        print "h: ", number
    else:
        print number
