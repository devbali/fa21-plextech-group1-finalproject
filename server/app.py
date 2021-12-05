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
    pass
    # Eugene

@app.route("/meeting", methods=['POST', 'PUT'])
def create_meeting():
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    cur.execute("create table meeting (meetingID,title,leader_id,location,type,startTime,endTime,capacity)")
    meeting_id = uuid.uuid4()
    meetingData = Flask.request.json()
    startTime = meetingData["startTime"] #alter depending on key in json input
    endTime = meetingData["endTime"]
    leaderID = meetingData["leaderID"]
    title = meetingData["meetingTitle"]
    type = meetingData["meetingType"]
    cap = meetingData["capacity"]
    location = meetingData["meetingLocation"]
    cur.execute("insert into meeting values (?,?,?,?,?,?,?,?)" (meeting_id,title,leaderID,location,type,startTime,endTime,cap))
    print(cur)
    con.close()
    # Request Body: datetimes (start and end), title, user id, location, class_id, capacity, type
    
    # Rhythm

@app.route("/meeting/<meeting_id>", methods=['GET'])
def get_meeting(meeting_id):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    cur.execute("select * from meeting where meeting_id=:meeting_id")
    print(cur.fetchone())
    con.close()
    
    # Rhythm

@app.route("/meeting/<meeting_id>", methods=['DELETE'])
def remove_meeting(meeting_id):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    cur.execute("delete * from meeting where meeting_id=:meeting_id")
    con.close()
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
