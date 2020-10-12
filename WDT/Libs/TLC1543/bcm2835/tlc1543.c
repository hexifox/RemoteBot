#include <stdio.h>
#include "bcm2835.h"

#define	Clock	16
#define	Address	20
#define	DataOut	21

unsigned int ADC_Read(unsigned char channel)
{
	unsigned int value;
	unsigned char i;
	unsigned char LSB = 0, MSB = 0;
 
	channel = channel << 4;
	for (i = 0; i < 4; i ++) 
	{
		if(channel & 0x80)
			bcm2835_gpio_write(Address,1);
		else 
			bcm2835_gpio_write(Address,0);
		bcm2835_gpio_write(Clock ,1);
		bcm2835_gpio_write(Clock ,0);
		channel = channel << 1;
	}
	for (i = 0; i < 6;i ++) 
	{
		bcm2835_gpio_write(Clock ,1);
		bcm2835_gpio_write(Clock ,0);
	}

	delayMicroseconds(15);
	for (i = 0; i < 2; i ++) 
	{
		bcm2835_gpio_write(Clock ,1);
		MSB <<= 1;
		if (bcm2835_gpio_lev(DataOut))
			MSB |= 0x1;
		bcm2835_gpio_write(Clock ,0);
	} 
	for (i = 0; i < 8; i ++) 
	{
		bcm2835_gpio_write(Clock ,1);
		LSB <<= 1;
		if (bcm2835_gpio_lev(DataOut))
			LSB |= 0x1;
		bcm2835_gpio_write(Clock ,0);
	} 
	value = MSB;
	value <<= 8;
	value |= LSB;
	return value; 
}


int main()
{
	if (!bcm2835_init())return 1 ;

	bcm2835_gpio_fsel(DataOut,BCM2835_GPIO_FSEL_INPT);
	bcm2835_gpio_set_pud(DataOut, BCM2835_GPIO_PUD_UP);

	bcm2835_gpio_fsel(Clock,BCM2835_GPIO_FSEL_OUTP);
	bcm2835_gpio_fsel(Address,BCM2835_GPIO_FSEL_OUTP);


	while(1)
	{
		int c = ADC_Read(6);
		int l = 0.1201*c-23; 
  		printf(l);
		bcm2835_delay(100);
  	}
}