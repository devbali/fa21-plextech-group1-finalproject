import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetcher } from "../util/fetcher";
import { inMemoryUserManager } from "../util/fetcher";
import NavBar from "../components/NavBar";

function Register() {
  const [allCourses, setAllCourses] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const [occupation, setOccupation] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // fetch classes in database
    fetcher("/classes")
      .then((res) => res.json())
      .then((data) => {
        setAllCourses(data["result"]);
      });
  }, []);

  const defaultProps = {
    options: allCourses,
    getOptionLabel: (option) => option.department + " " + option.course_number,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // put information into the database about the user and their class relationships
    fetcher("/user", {
      method: "PUT",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ occupation: occupation, courses: courses }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["status"] === 200) {
          if (
            location.state === null ||
            location.state.referrer === null
          ) {
            history("/dashboard");
          } else {
            history(location.state.referrer);
          }
        } else {
          alert(data["message"]);
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <NavBar />
      <div style={{ padding: "2rem" }}>
        <Card elevation={5} sx={{ maxWidth: 500, margin: "auto" }}>
          <CardContent>
            <h1 style={{ textAlign: "center" }}>
              Hi
              {inMemoryUserManager.getUser() != null
                ? ` ${inMemoryUserManager.getUser()["profileObj"]["givenName"]}`
                : ""}
              ,
            </h1>
            <h3>Let's get started!</h3>

            <form id="register" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl component="fieldset" required>
                  <FormLabel component="legend">Occupation</FormLabel>
                  <RadioGroup
                    aria-label="occupation"
                    name="radio-buttons-group"
                    value={occupation}
                    onChange={(e, occupation) => {
                      setOccupation(occupation);
                    }}
                  >
                    <FormControlLabel
                      value={2}
                      control={<Radio required />}
                      label="Student"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio required />}
                      label="Teacher Assistant"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" required>
                  <FormLabel component="legend">Classes</FormLabel>
                  <Autocomplete
                    multiple
                    value={courses}
                    onChange={(e, course) => {
                      setCourses(course);
                    }}
                    {...defaultProps}
                    id="classSelector"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        inputProps={{
                          ...params.inputProps,
                          required: courses.length === 0,
                        }}
                        label="Select your courses"
                        variant="standard"
                      />
                    )}
                  />
                </FormControl>
                <Button
                  form="register"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Register;
