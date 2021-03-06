from flask import Flask, request, redirect, make_response
import sqlite3
import os.path
import os
import uuid
import json
from flask import jsonify
import requests
from functools import wraps


BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir)
db_path = os.path.join(BASE_DIR, "officehours.db")

app = Flask(__name__)

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[-1].strip()
 
        if not token:
            return jsonify({'status':401,'message': 'a valid token is missing'}), 401
       
        url = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token

        current_user = {}
        r = requests.get(url)
        if r.status_code != requests.codes.ok:
           return jsonify({'status': 401,'message': 'token is invalid'}), 401
        else:
            current_user["email"] = r.json()["email"]
            with sqlite3.connect(db_path) as con:
                cur = con.cursor()
                users = cur.execute("SELECT id, occupation FROM user WHERE email = ? LIMIT 1;", (current_user["email"],)).fetchone()
                if not users:
                    current_user["uninitialized"] = True
                    uuidnew = str(uuid.uuid4())
                    cur.execute("INSERT INTO user VALUES (?,?,?)", (uuidnew, 0, current_user["email"]))
                    current_user["id"] = uuidnew
                    con.commit()
                else:
                    current_user["uninitialized"] = False
                    current_user["id"] = users[0]
                    current_user["occupation"] = users[1]
        
        # if current_user["uninitialized"]:
        #     return redirect('/register')
        return f(current_user, *args, **kwargs)
    return decorator

@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] =  True
    header["Access-Control-Allow-Origin"] = "http://localhost:8080"
    header["Access-Control-Allow-Headers"] = "*"
    header["Access-Control-Allow-Methods"] = "*"    
    header["Content-Type"] = "text/json"
    return response

@token_required
def get_user(user):
    return user

@app.route("/")
def helloworld():
    return 'Hello, World!'

@app.route("/test/<pathvariable>", methods=['GET','PUT'])
def somevar(pathvariable):
    # Example method that reads from database
    with sqlite3.connect(db_path) as con:
        cur = con.cursor()
        users = cur.execute("SELECT COUNT(*) from user;").fetchone()
    print(users)
    # See https://docs.python.org/3/library/sqlite3.html for more

    return f"Hello, World! We have {users[0]} users. You used path variable {pathvariable}. Random UUID: {uuid.uuid4()}"

@app.route("/users", methods=['GET', 'OPTIONS'])
@token_required
def get_users(user):
    # if user["uninitialized"] == False:
    #     return redirect('/register')
    # else:
    #     return redirect('/schedule')
    return jsonify({'status': 200, 'uninitialized': user['uninitialized'], 'message': user}), 200

@app.route("/classes", methods=['GET'])
def get_classes():
    with sqlite3.connect(db_path) as con:
        cur = con.cursor()
        classes = cur.execute("SELECT department, course_number, id FROM class;").fetchall()
        
    return {'result': [{'department': row[0], 'course_number': row[1], 'id': row[2]} for row in classes]}

@app.route("/user", methods=['OPTIONS', 'PUT'])
def create_user_settings():
    # Request Body: user occupation, user email, user classes (as a list)
   with sqlite3.connect(db_path) as con:
        try:
            cur = con.cursor()
            data = request.json
            occupation = data["occupation"]
            courses = data["courses"]
            user_id = get_user()['id']
            user_email = get_user()['email']

            cur.execute("UPDATE user SET occupation = ? WHERE id = ? AND email = ?", (occupation, user_id, user_email))

            for course in courses:
                userclassuuid = str(uuid.uuid4())
                cur.execute("INSERT INTO user_class VALUES (?, ?, ?, ?)", (userclassuuid, course["id"], user_id, occupation))

            return jsonify({'status': 200,'message': 'user settings updated'}), 200
        except Exception as e:
            return jsonify({'status': 401,'message': str(e)}), 401
    # Eugene

@app.route("/meeting", methods=['POST', 'PUT'])
@token_required
def create_meeting(user):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    
    meetingData = json.loads(request.data.decode('utf-8'))
    startTime = meetingData["startTime"] #alter depending on key in json input
    endTime = meetingData["endTime"]
    classID = meetingData["classID"]
    leaderID = meetingData["leaderID"]
    title = meetingData["meetingTitle"]
    meetingtype = meetingData["meetingType"]
    cap = meetingData["capacity"]
    location = meetingData["meetingLocation"]
    
    if request.method=='POST':    
        meeting_id = str(uuid.uuid4())
        cur.execute("insert into meeting values (?,?,?,?,?,?,?,?,?)", (meeting_id,title,leaderID,location,meetingtype,startTime,endTime,cap,classID))
        print(cur)
        con.commit()
        con.close()
    elif request.method=='PUT':
        meeting_id = meetingData["id"]
        cur.execute("update meeting set title=?,leader_id=?,location=?,type=?,date_time_start=?,date_time_end=?,capacity=?,class_id=? where id=?",(title,leaderID,location,meetingtype,startTime,endTime,cap,classID,meeting_id))
        print(cur)
        con.commit()
        con.close()
    
    resp = jsonify(success=True)
    return resp
    # Request Body: datetimes (start and end), title, user id, location, class_id, capacity, type
    
    # Rhythm


@app.route("/meeting/<meeting_id>", methods=['GET'])
def get_meeting(meeting_id):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    cur.execute("select * from meeting where id=:meeting_id", {"meeting_id": meeting_id})
    values = cur.fetchone()
    print("DEV HAS PLEXSTD")
    print(values)
    dictquery = {"meeting ID": values[0],"title":values[1],"user ID":values[2],"location":values[3],"type":values[4],"start time":values[5], "end time":values[6], "capacity": values[7], "class ID":values[8]}
    con.close()
    return dictquery
    # Rhythm

@app.route("/meeting/<meeting_id>", methods=['DELETE'])
def remove_meeting(meeting_id):
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    cur.execute("delete from meeting where id=:meeting_id", {"meeting_id": meeting_id})
    con.commit()
    con.close()
    resp = jsonify(success=True)
    return resp
    # Rhythm

@app.route("/meetings", methods=['GET'])
def show_all_meetings():
    # Request query: datetimes (start and end)
    # Response: meetings, and whether the user is already registered for them
    meetings = {"meetings":[]}
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    #get the ids for all meetings where the user is registered through relational table query
    meeting_id_query = cur.execute("SELECT meeting_id FROM user_meeting WHERE user_meeting.user_id = '3fff27bb-19f7-4f25-8b52-8194ae23d5a4';").fetchall()
    meeting_info = cur.execute("SELECT title, location, date_time_start, date_time_end, meeting.id, user.email, capacity FROM meeting, user_class, user WHERE meeting.class_id = user_class.class_id AND user_class.user_id = '3fff27bb-19f7-4f25-8b52-8194ae23d5a4' AND user.id = meeting.leader_id").fetchall()
    meeting_ids = [id[0] for id in meeting_id_query]
    #go through all meetings which pertain to the student/ta's relevant courses").fetchall()
    for info in meeting_info:
        leader_name = info[5]
        meeting_title = info[0]
        meeting_location = info[1]
        start = info[2]
        end = info[3]
        meeting_capacity = info[6]
        #change the registered atrribute baseed on whether the id of the meeting is within meeting_ids (determines if user is registered)
        if info[4] in meeting_ids:
            meetings["meetings"].append({'TA': leader_name, 'title': meeting_title, 'location' : meeting_location, 
            'start_time': start, 'end_time': end, "capacity": meeting_capacity, "registered": True})
        else:
            meetings["meetings"].append({'TA': leader_name, 'title': meeting_title, 'location' : meeting_location, 
            'start_time': start, 'end_time': end, "capacity": meeting_capacity, "registered": False })
    return meetings
    # Rohan

@app.route("/appointment/<meeting_id>", methods=['GET'])
def get_appointment():
    # Request parameter: meeting_id
    # user_id = slkdl
    # use meeting_id to display details for an appointment, determine whether the meeting is being attended
    pass
    # Adhiraj

@app.route("/appointment/<meeting_id>", methods=['POST'])
@token_required
def book_appointment(meeting_id, user):
    # Request parameter: meeting_id
    #user_id = slkdl
    # meeting_id passed in, add to db
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    appointmentData = json.loads(request.data.decode('utf-8'))
    appointment_id = str(uuid.uuid4())
    meeting_id = appointmentData["meetingID"]
    user_id = user["id"]
    cur = con.cursor() 
    cur.execute("insert into user_meeting values (?,?,?)", (appointment_id, user_id, meeting_id))
    con.commit()
    con.close()
    resp = jsonify(success=True)
    return resp
    # Adhiraj

@app.route("/appointment/<meeting_id>", methods=['DELETE'])
@token_required
def cancel_appointment(meeting_id, user):
    # Request parameter: meeting_id
    # user_id = slkdl
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    user_id = user["id"]
    cur.execute("DELETE FROM user_meeting WHERE user_id = ? and meeting_id = ?;",(user_id,meeting_id))
    con.commit()
    con.close()
    resp = jsonify(success=True)
    return resp
    pass
    # Adhiraj


if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=5001)

