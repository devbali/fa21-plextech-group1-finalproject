import React from "react";
import { Grid, Card, CardContent, IconButton } from "@mui/material";

export default function Carde({materialIcon, iconColor, title, content}) {
  return (
    <Grid item xs={12} lg={4}>
      <Card elevation={5}>
        <CardContent p={3}>
          <IconButton disabled style={{width: "50px", height: "50px", color: "white", backgroundColor: iconColor, boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)"}}>
            {materialIcon}
          </IconButton>
          <h2>{title}</h2>
          <p style={{color: "#7a7b97"}}>{content}</p>
        </CardContent>
      </Card>
    </Grid>
  );
}
