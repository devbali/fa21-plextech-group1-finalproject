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

function Register() {
  // need to find way to receive user information from oauth2 process (dev)
  const [allCourses, setAllCourses] = useState([]);
  const history = useNavigate();
  const location = useLocation();
  const [occupation, setOccupation] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
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
    // fetch("/user", {
    //   method: "PUT",
    //   headers: {
    //     content_type: "application/json",
    //   },
    //   // grab Request Body: user occupation, user email, user classes (as a list) and send it in a json object to our server
    //   body: JSON.stringify(),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((json) => {
    //     // if success then send them to dashboard with their info
    //     if (json[0] === "success") {
    //       if (
    //         location.state === undefined ||
    //         location.state.referrer === undefined
    //       )
    //         history("/dashboard");
    //       else history(location.state.referrer);
    //     }
    //     // if failure then refresh page with failure dialog
    //   });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <Card elevation={5} sx={{ maxWidth: 500, margin: "auto" }}>
          <CardContent>
            {/* I want this h1 to have the first name of the user from the OAuth2 process */}
            <h1 style={{ textAlign: "center" }}>Hi User,</h1>
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
