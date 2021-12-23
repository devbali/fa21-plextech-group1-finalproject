import { Container, Grid } from "@mui/material";
import React from "react";
import Carde from "../components/Carde";
import LandingPageNav from "../components/LandingPageNav";
import GroupsIcon from '@mui/icons-material/Groups';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';

function Home() {
  return (
    //   wrapper
    <div>
      <LandingPageNav />
      <div style={{ padding: "3rem" }}>
        {/* this is for content */}
        <div style={{ padding: "3rem" }}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={6} m="auto">
                <div>
                  <h1
                    style={{ fontWeight: "700!important", fontSize: "2.5rem" }}
                  >
                    Make it easier to schedule office hours.
                  </h1>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      marginTop: "0",
                      marginBottom: "1rem",
                      lineHeight: "1.5",
                      color: "#7a7b97"
                    }}
                  >
                    Bring all of your classes, work, and other obligations into our all in one platform, so you can arrange office hours to fit around your hectic schedule.
                  </p>
                </div>
              </Grid>
              <Grid
                item
                px={0}
                xs={12}
                lg={6}
                alignItems="center"
                justifyContent="center"
              >
                <img
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    margin: "auto",
                    display: "block",
                  }}
                  alt="School vector created by pikisuperstar - www.freepik.com"
                  src="/hero-4049217.svg"
                ></img>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <div style={{ padding: "3rem" }}>
        <Container>
          <Grid container spacing={4}>
            <Carde materialIcon={<GroupsIcon/>} iconColor="#ffa202" title="Accessible" content="We've included all GSI, instructor, and TA office hours for your course, so you can choose what works best for you."/>
            <Carde materialIcon={<EventAvailableRoundedIcon/>} iconColor="#1a77e9" title="Ultra-Compact" content="Every weekly-based event you need is displayed on your calendar, letting you know exactly what is on your plan for the week."/>
            <Carde materialIcon={<CalendarViewWeekIcon/>} iconColor="#5cb25d" title="Easy to Use" content="Finding office hours that work for you is now a piece of cake and can be viewed at any time."/>
          </Grid>
        </Container>
      </div>
      <div style={{ padding: "1rem"}}>
        <div style={{textAlign: "center"}}>
            Dev's Daughters © 2021
        </div>
      </div>
    </div>
  );
}

export default Home;
