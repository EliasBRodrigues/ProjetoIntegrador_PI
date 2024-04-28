from flask import Flask
from back import user, db

app = Flask(__name__, template_folder='views')
user.init_app(app)

if __name__ == '__main__':
    app.run(debug = True)