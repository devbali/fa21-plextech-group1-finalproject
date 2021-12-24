import React, {Component} from 'react';
import {fetcher} from "../util/fetcher";
import Calendar from 'react-awesome-calendar';

function getProps (data) {
    var Calendar_props = []
    console.log(data);
    var meetings = data["meetings"];
    for(let i = 0; i < meetings.length; i++)
    {
        let start_time_stamp = meetings[i]["start_time"];
        let end_time_stamp = meetings[i]["end_time"];
        let start_ISO = new Date(start_time_stamp * 1000).toISOString();
        let end_ISO = new Date(end_time_stamp * 1000).toISOString();
        if(meetings[i]["registered"] == true){
        Calendar_props.push({
            id: meetings[i]["id"],
            color: '#1ccb9e',
            from: start_ISO,
            to: end_ISO,
            title: meetings[i]["title"] + " at " + meetings[i]["location"]

            })
        }
        else{
            Calendar_props.push({
                id: meetings[i]["id"],
                color: '#3694DF',
                from: start_ISO,
                to: end_ISO,
                title: meetings[i]["title"] + " at " + meetings[i]["location"]
            })
        }
    }
    return Calendar_props;
}
function setRegistrationStatus(data){
    var regs = {}
    console.log(data);
    var meetings = data["meetings"];
    for(let i = 0; i < meetings.length; i++)
    {
        if(meetings[i]["registered"] == true){
            regs[meetings[i]["id"]] = true
        }
        else{
            regs[meetings[i]["id"]] = false
        }

    }
    return regs;

}

export default class Scheduler extends Component{
    constructor(){
        super();
        this.state = {
            meetings: [],
            regs: {},
            changed: false
        }
    }

    get_meetings = () => {
        fetcher("/meetings")
            .then(res =>res.json())
            .then(data =>{
                this.setState({ meetings: getProps(data), regs: setRegistrationStatus(data), changed: false});
        })
    }

    componentDidMount(){
        this.get_meetings()
    }
    render(){
        console.log("EVENTS", this.state.meetings)
        console.log("Regs", this.state.regs)
        return(
            <Calendar
            events={this.state.meetings}
            onClickEvent ={
                (event)=>{
                    if(this.state.regs[event] == true){
                        fetcher(`/appointment/${event}`, {method: "DELETE"})
                            .then(res =>res.json())
                            .then(data =>{
                                alert(`Your registration for this meeting has been canceled!`);
                                this.get_meetings()
                            })
                    }
                    else{
                        fetcher(`/appointment/${event}`, {method: "POST"})
                            .then(res =>res.json())
                            .then(data=>{
                                alert(`You are registered for this OH appt!`);
                                this.get_meetings()
                            })
                    }
                    
                }

            }
        />
        );
    }

}
