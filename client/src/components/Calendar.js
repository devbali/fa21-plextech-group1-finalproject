import React, {Component} from 'react';
import Calend from 'calend';
export default class Calendar extends Component{
    constructor(){
        super();
    }
    render(){
        let {meetings} = this.props;
        return(
            <div>
                <Calend
                    events={meetings}
                    initialDate={new Date().toISOString()}
                    initialView={CALENDAR_VIEW.WEEK}
                />
            </div>
        );
    }

}