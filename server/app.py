from flask import Flask
import sqlite3
import os.path
import os
import uuid

BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir)
db_path = os.path.join(BASE_DIR, "officehours.db")

app = Flask(__name__)

@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] =  True
    header["Access-Control-Allow-Origin"] = "localhost:8000"
    header["Access-Control-Allow-Headers"] = "*"
    header["Content-Type"] = "text/json"
    return response

@app.route("/")
def helloworld():
    return "Hello World. Use /test/<some string> for more."

@app.route("/test/<pathvariable>", methods=['GET','PUT'])
def somevar(pathvariable):
    # Example method that reads from database
    with sqlite3.connect(db_path) as con:
        cur = con.cursor()
        users = cur.execute("SELECT COUNT(*) from user;").fetchone()
    print(users)
    # See https://docs.python.org/3/library/sqlite3.html for more

    return f"Hello, World! We have {users[0]} users. You used path variable {pathvariable}. Random UUID: {uuid.uuid4()}"

@app.route("/user/<token>", methods=['GET'])
def get_user(token):
    pass
    # Not for right now

@app.route("/user", methods=['POST', 'PUT'])
def create_user_settings():
    # Request Body: user occupation, user email, user classes (as a list)
    data = Flask.request.json
    occupation = data['occupation']
    email = data['email']
    class_ids = data['class_ids']

    with sqlite3.connect(db_path) as con:
        try:
            cur = con.cursor()
            cur.execute("INSERT INTO user (occupation, email) VALUES (%s, %s)" %(occupation, email))
            user_id = cur.execute("SELECT user_id FROM user WHERE email = (%s)" %(email))
            cur.executemany("INSERT INTO user_class (class_id, user_id, role) VALUES (%s, %s, %s)" %(class_ids, user_id, occupation))
            con.commit()
        except:
            return 403
    # Eugene

@app.route("/meeting", methods=['POST', 'PUT'])
def create_meeting():
    # Request Body: datetimes (start and end), title, user id, location, class_id, capacity, type
    pass
    # Rhythm

@app.route("/meeting/<meeting_id>", methods=['GET'])
def get_meeting():
    # Request parameter: meeting_id
    # user_id = slkdl
    pass
    # Rhythm

@app.route("/meeting/<meeting_id>", methods=['DELETE'])
def remove_meeting(meeting_id):
    # Request Body: datetimes (start and end), title, user id, location, class_id, capacity, type
    pass
    # Rhythm

@app.route("/meetings", methods=['GET'])
def show_all_meetings():
    # Request query: datetimes (start and end)
    # Response: meetings, and whether the user is already registered for them
    pass
    # Rohan

@app.route("/appointment/<meeting_id>", methods=['GET'])
def get_appointment():
    # Request parameter: meeting_id
    # user_id = slkdl
    pass
    # Adhiraj

@app.route("/appointment/<meeting_id>", methods=['POST'])
def book_appointment():
    # Request parameter: meeting_id
    # user_id = slkdl
    pass
    # Adhiraj

@app.route("/appointment/<meeting_id>", methods=['DELETE'])
def cancel_appointment():
    # Request parameter: meeting_id
    # user_id = slkdl
    pass
    # Adhiraj

if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=5000)