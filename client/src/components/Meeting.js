import React, { Component }  from 'react';
import { Button, Paper, Typography } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputText } from "./form-components/FormInputText";
import { FormInputMultiCheckbox } from "./form-components/FormInputMultiCheckbox";
import { FormInputDropdown } from "./form-components/FormInputDropdown";
import { FormInputDate } from "./form-components/FormInputDate";
import { FormInputSlider } from "./form-components/FormInputSlider";
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';

export default class Meeting extends Component{
    constructor(props){
        super(props);
    }
    defaultValues = {
        title: "",
        location: "",
        dateStartvalue: new Date(),
        dateEndvalue: new Date(),
        type: Number,
        capacity: 0,
      };
      

        methods = useForm({ defaultValues: defaultValues });
        
        
    render(){
        let onSubmit = data => console.log(data);
        let { handleSubmit, reset, control, setValue, watch } = methods;
        let {meeting_ID}= this.props;
        return (
            <Paper
                style={{
                display: "grid",
                    gridRowGap: "20px",
                    padding: "20px",
                    margin: "10px 300px",
                    }}
    >
      <Typography variant="h6"> Form Demo</Typography>

      <FormInputText name="title" control={control} label="meeting title" />
      <FormInputText name="location" control={control} label="meeting location" />
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Meeting Start DateTime"
            value={value}
            onChange={(newValue) => {
            setValue(newValue);
            }}
        />

        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Meeting End DateTime"
                value={value}
                onChange={(newValue) => {
             setValue(newValue);
            }}
            />
        </LocalizationProvider>
    </Paper>
        )
    }
}
