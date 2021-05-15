from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import json

from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dogbowl.db'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String(50), nullable = False)
    time = db.Column(db.DateTime,nullable = False,default = datetime.utcnow)
    value = db.Column(db.Float, nullable = False)
    level = db.Column(db.Float, nullable = False)
    units = db.Column(db.String(50),nullable = False)

class EventSchema(ma.Schema):
    class Meta:
        fields = ("id","type","time","value","level","units")
        model = Event
 

event_schema = EventSchema()
events_schema = EventSchema(many=True)

@app.route("/events/",methods=["GET"])
def get_events():
    events = Event.query.all()
    return jsonify({"eventHistory":events_schema.dump(events)})

if __name__ == '__main__':
    app.run(host="0.0.0.0")