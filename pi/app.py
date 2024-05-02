from flask import Flask
from back import user

app = Flask(__name__, template_folder='views')
app.secret_key = "projeto_integrador"

user.init_app(app) 
    
if __name__ == '__main__':
    app.run(debug=True)