import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Scheduler from "../components/Calendar";
import NavBar from "../components/NavBar";
import { inMemoryUserManager } from "../util/fetcher";


function Dashboard(){
    return(
        <div>
            <NavBar/>
            <h1 style={{ textAlign: "center" }}>
              Hello
              {inMemoryUserManager.getUser() != null
                ? ` ${inMemoryUserManager.getUser()["profileObj"]["givenName"]}`
                : ""}
            </h1>
            <div style={{padding: "0 4rem 4rem 4rem"}}>
                <Scheduler/>
            </div>
        </div>
        
        );
    
}
export default Dashboard;