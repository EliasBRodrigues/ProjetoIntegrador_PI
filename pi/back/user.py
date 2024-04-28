from flask import render_template
from back import db
import json

def init_app(app):
    
    @app.route('/', methods = ['GET', 'POST'])
    def home():
        return render_template("login.html")

    @app.route('/signin', methods = ['GET', 'POST'])
    def signin():
        status, username = db.check_user()
        data = {
                "username": username,
                "status": status
            }
        return json.dumps(data)

    @app.route('/signup', methods = ['GET', 'POST'])
    def signup():
        return render_template("signup.html")

    @app.route('/register', methods = ['GET', 'POST'])
    def register():
        status = db.insert_data()
        return json.dumps(status)
