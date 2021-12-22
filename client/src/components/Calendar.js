import React, {Component} from 'react';
import Calend from 'calend';
import 'calend/styles/index.css';
import { CALENDAR_VIEW } from 'calend/common/enums';
export default class Calendar extends Component{
    constructor(){
        super();
    }
    render(){
        let {meetings} = this.props;
        console.log(meetings)
        return(
            <div>
                <Calend
                    events={meetings}
                    initialView = {CALENDAR_VIEW.WEEK}
                    disabledViews = {[CALENDAR_VIEW.THREE_DAYS]}
                    hourHeight ={60}
                    
                />
            </div>
        );
    }

}
