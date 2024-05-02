
from flask import app, Flask
from flask_mongoengine import MongoEngine 

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'userdb',
    'host': 'localhost',
    'port': 27017
}

db = MongoEngine()
db.init_app(app)
class User(db.Document):
    name = db.StringField()
    email = db.StringField()
    password = db.StringField()