import pymongo
from flask import request

client = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
userdb = client['userdb']
users = userdb.users


def insert_data():
	if request.method == 'POST':
		username = request.form['username']
		email = request.form['email']
		password = request.form['password']

		reg_user = {}
		reg_user['username'] = username
		reg_user['email'] = email
		reg_user['password'] = password

		if users.find_one({"email":email}) == None:
			users.insert_one(reg_user)
			return True
		else:
			return False


def check_user():

	if request.method == 'POST':
		email = request.form['email']
		password = request.form['password']

		user = {
			"email": email,
			"password": password
		}

		user_data = users.find_one(user)
		if user_data == None:
			return False, ""
		else:
			return True, user_data["username"]