from flask import Flask, render_template
from back import user
from pymongo import MongoClient

app = Flask(__name__, template_folder='views')
app.secret_key = "projeto_integrador"

user.init_app(app) 

client = MongoClient('mongodb+srv://<USER>:<PASSWORD>@cluster0.fgsxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['projeto_integrador']
medicamentos_collection = db['remedios']

@app.route('/medicine')
def medicine():
    # Recuperar dados do MongoDB
    medicamentos = list(medicamentos_collection.find())
    return render_template('medicine.html', medicamentos=medicamentos)

if __name__ == '__main__':
    app.run(debug=True)