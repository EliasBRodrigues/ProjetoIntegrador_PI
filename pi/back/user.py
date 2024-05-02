from flask import render_template, request, json, redirect, session
from werkzeug.security import generate_password_hash, check_password_hash
from back.db import User

def init_app(app):
    @app.route('/')
    def main():
        return render_template('index.html')
        
    @app.route('/signup',methods=['POST','GET'])
    def signUp():   
        #print(today)
        if request.method == 'POST':
            _name = request.form['name']
            _email = request.form['email']
            _password = request.form['password']
            # validate the received values
            if _name and _email and _password:
                _hashed_password = generate_password_hash(_password)
                users = User.objects(email=_email).first()
                if not users:
                    usersave = User(name=_name, email=_email, password=_hashed_password)
                    usersave.save()
                    msg =  '{ "html":"ok"}'
                    msghtml = json.loads(msg)
                    return msghtml["html"]
                else:
                    msg =  '{ "html":"<h3>Este Email Já Existe</h3>"}'
                    msghtml = json.loads(msg)
                    return msghtml["html"]
            else:
                msg =  '{ "html":"<h3>Preencha todos os campos</h3>"}'
                msghtml = json.loads(msg)
                return msghtml["html"]
        else:
            return render_template("signup.html")
    
    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            # Get Form Fields
            _username = request.form['email']
            _password = request.form['password']
            # Get user by username
            users = User.objects(email=_username).count() 
            print(users) # result 1
            if users > 0:
                # Get stored hash
                user_rs = User.objects(email=_username).first()
                password = user_rs['password']
                print(password)
                # Compare Passwords 
                if check_password_hash(password, _password):
                    # Passed
                    session['sessionusername'] = _username
                    return redirect('/userHome')
                else:
                    error = 'Invalid login'
                    return render_template('signin.html', error=error)
            else:
                error = 'Username not found'
                return render_template('signin.html', error=error)
        
        return render_template('signin.html')
        
    @app.route('/userHome')
    def userHome():
        print(session.get('sessionusername'))   
        if session.get('sessionusername'):
            return render_template('home.html')
        else:
            return render_template('error.html',error = 'Acesso Negado')
    
    @app.route('/logout')
    def logout():
        session.pop('sessionusername', None)
        return redirect('/')
