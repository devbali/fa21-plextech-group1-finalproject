import React, {Component} from 'react';
import {fetcher} from "../util/fetcher";
import Calendar from 'react-awesome-calendar';

function getProps (data) {
    var Calendar_props = []
    var id_num = 1
    console.log(data);
    var meetings = data["meetings"];
    for(let i = 0; i < meetings.length; i++)
    {
        let start_time_stamp = meetings[i]["start_time"];
        let end_time_stamp = meetings[i]["end_time"];
        let start_ISO = new Date(start_time_stamp).toISOString();
        let end_ISO = new Date(end_time_stamp).toISOString();
        console.log(end_ISO)
        if(meetings[i]["registered"] == true){
        id_num += (id_num % 2)
        Calendar_props.push({
            id: id_num,
            color: '#1ccb9e',
            from: start_ISO,
            to: end_ISO,
            title: meetings[i]["title"] + "at" + meetings[i]["location"]

            })
        
        }
        else{
            id_num += (id_num % 2 + 1) 
            Calendar_props.push({
                id: id_num,
                color: '#3694DF',
                from: start_ISO,
                to: end_ISO,
                title: meetings[i]["title"] + "at" + meetings[i]["location"]
            })
        }

       
        id_num += 2
    }
    return Calendar_props;
}

export default class Scheduler extends Component{
    constructor(){
        super();
        this.state = {
            meetings: []
        }
    }
    componentDidMount(){
        
        
        fetcher("http://localhost:5001/meetings")
            .then(res =>res.json())
            .then(data =>{
                
                this.setState({ meetings: getProps(data)});
                this.forceUpdate()

        })
    }
    render(){
        
        
        
        console.log("EVENTS", this.state.meetings)
        return(
            <Calendar
            events={this.state.meetings}
            onClickEvent = {(event)=>{
                if(event % 2 == 0){

                }
                else{

                }
            }}
        />
        );
    }

}
