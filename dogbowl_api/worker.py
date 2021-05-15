import sys
import time
import numpy as np
from scipy.signal import find_peaks
from datetime import datetime
import matplotlib.pyplot as plt

import RPi.GPIO as GPIO
from hx711 import HX711

from app import Event, db

# choose pins on rpi (BCM5 and BCM6)
hx = HX711(dout=5, pd_sck=6)

# HOW TO CALCULATE THE REFFERENCE UNIT
#########################################
# To set the reference unit to 1.
# Call get_weight before and after putting 1000g weight on your sensor.
# Divide difference with grams (1000g) and use it as refference unit.

hx.setReferenceUnit(.6)

hx.reset()
hx.tare()

vals = []

trough_scaling = .2
peak_scaling = .7
baseline_threshold = 150

exec = 0
while True:
    exec += 1
    try:
        val = hx.getWeight()
        print("{0: 4.4f}".format(val))
        vals.append(val)

        

        if exec % 60 == 0:
            new_events = []
            x = np.asarray(vals)
            peaks, _ = find_peaks(x, distance=150)
            troughs, _ = find_peaks(-x, distance=150)
            for i in peaks:
                val = x[i]*peak_scaling
                if val >= baseline_threshold:
                    print(int(val),"added at", datetime.now())
                    level = Event.query.order_by(Event.id.desc()).first().level + val
                    new_events.append(Event(type="refill",value=val,level=level,units = "grams"))
                    

            
            for i in troughs:
                val = x[i]*trough_scaling
                if val <= -baseline_threshold:
                    print(int(val),"removed at", datetime.now())
                    level = min(Event.query.order_by(Event.id.desc()).first().level + val,0)
                    if level > 0:
                        new_events.append(Event(type="eating",value=-val,level=level,units = "grams"))
                plt.plot(-x)
                plt.plot(troughs, -x[troughs], "x")
                plt.savefig("troughs.png")
            for i in new_events:
                db.session.add(i)
            db.session.commit()
            vals = []


    except (KeyboardInterrupt, SystemExit):
        np.savetxt("out2.csv",vals,delimiter=",")
        GPIO.cleanup()
        sys.exit()