from app import db
from app import Event

import dateutil.parser

db.create_all()

date_val = dateutil.parser.isoparse("2021-05-14T09:25:43.511Z")
date_val2 = dateutil.parser.isoparse("2021-05-14T09:45:23.511Z")
date_val3 = dateutil.parser.isoparse("2021-05-14T11:15:43.511Z")

event = Event(type="eating",time = date_val,value = 50, level = 480, units = "grams")
event2 = Event(type="refill",time = date_val2,value = 200, level = 680, units = "grams")
event3 = Event(type="eating",time = date_val3,value = 100, level = 580, units = "grams")

db.session.add(event)
db.session.add(event2)
db.session.add(event3)
db.session.commit()
