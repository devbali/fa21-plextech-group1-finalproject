import React, { Component, useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import {fetcher} from "../util/fetcher";


function Schedule(){
    var id_num = 1
    var Calendar_props = {}
    fetcher("http://localhost:5001/meetings")
        .then(res =>res.json())
        .then(data =>{
            var meetings = data["meetings"]
            for(let i = 0; i < meetings.length; i++)
            {
                let start_time_stamp = meetings[i]["start_time"];
                let end_time_stamp = meetings[i]["end_time"];
                let start_time_object = new Date(start_time_stamp);
                let start_ISO = start_time_object.toISOString();
                let end_ISO = new Date(end_time_stamp).toISOString();
                let year = start_time_object.getUTCFullYear().toString();
                let month = (start_time_object.getUTCMonth() + 1);
                if(month < 10){
                    month = "0" + month.toString();
                }
                else{
                    month = month.toString();
                }
                let date = start_time_object.getUTCDate();
                if(date < 10){
                    date = "0" + date.toString();
                }
                else{
                    date = date.toString();
                }
                let start_date_key = date +'-' + month + '-' + year;
                if(start_date_key in Calendar_props == false)
                    {
                        if(meetings[i]["registered"] == true)
                        {
                            Calendar_props[start_date_key] = [{
                                id: id_num,
                                startAt: start_ISO,
                                endAt: end_ISO,
                                summary: meetings[i]["title"] + " at " + meetings[i]["location"],
                                color: 'blue',
                            }];
                        }
                        else{
                            Calendar_props[start_date_key] = [{
                                id: id_num,
                                startAt: start_ISO,
                                endAt: end_ISO,
                                summary: meetings[i]["title"] + " at " + meetings[i]["location"],
                                color: 'red',
                            }];

                        }
                    }
                else
                    {
                        if(meetings[i]["registered"] == true)
                        {
                            Calendar_props[start_date_key].push({
                                id: id_num,
                                startAt: start_ISO,
                                endAt: end_ISO,
                                summary: meetings[i]["title"] + " at " + meetings[i]["location"],
                                color: 'blue',
                            });
                        }
                        else{
                            Calendar_props[start_date_key].push({
                                id: id_num,
                                startAt: start_ISO,
                                endAt: end_ISO,
                                summary: meetings[i]["title"] + " at " + meetings[i]["location"],
                                color: 'red',
                            });

                        }

                    }
                id_num += 1
            }
        return( <div className="App">
                    <section className="calendar">
                        <Calendar
                        meetings = {Calendar_props}
                         />
                    </section>
                </div>);
        })
        .catch(err => {
            // error catching
            console.log(err)
        })
}
export default Schedule;