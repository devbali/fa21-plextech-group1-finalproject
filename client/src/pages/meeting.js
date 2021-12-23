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
import Meeting from '../components/Meeting';


/*interface IFormInput {
  title: string;
  location: string;
  dateStartValue: Date;
  dateEndValue: Date;
  type: Number;
  capacity: Number;
}*/

const defaultValues = {
  title: "",
  location: "",
  dateStartvalue: new Date(),
  dateEndvalue: new Date(),
  type: Number,
  capacity: 0,
};

export const FormDemo = () => {
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue, watch } = methods;
  const onSubmit = data => console.log(data);

  return (
      <Meeting id="fkdjs"/>
  )
  }
