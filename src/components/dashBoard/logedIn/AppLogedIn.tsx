import React from "react";
import { AppHead } from "../addOns/AppHead";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./appLogedIn.css";

// Type Defination
interface BookmarkProps {
  desc: string;
  url: string;
}

// Initial Values
const initialValues: BookmarkProps = {
  desc: "",
  url: "",
};

export const AppLogedIn = () => {
  return (
    <div>
      <AppHead />
      {/* Input Form */}
      {/* ****** */}
      {/* ****** */}
      <div className='formm'>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            desc: Yup.string()
              .min(3, "Must be 3 characters or more")
              .max(15, "Must be 25 characters or less")
              .required("Kindly add Description"),
            url: Yup.string()
              .matches(
                /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                "Enter correct url!"
              )
              .required("Please enter website"),
          })}
          onSubmit={(values, onSubmitProps) => {
            console.log(values);
            onSubmitProps.resetForm();
          }}
        >
          <Form className='formControl1'>
            <div className='fieldsDiv1'>
              <Field
                as={TextField}
                required
                variant='outlined'
                className='fields'
                name='desc'
                label='Description'
                helperText={
                  <ErrorMessage name='desc'>
                    {(msg) => <span className='error'>{msg}</span>}
                  </ErrorMessage>
                }
              />
            </div>
            <div className='fieldsDiv1'>
              <Field
                as={TextField}
                required
                variant='outlined'
                className='fields'
                name='url'
                label='URL'
                helperText={
                  <ErrorMessage name='url'>
                    {(msg) => <span className='error'>{msg}</span>}
                  </ErrorMessage>
                }
              />
            </div>
            <div className='btnDivF'>
              <Button
                style={{ color: "white" }}
                variant='contained'
                className='green'
                type='submit'
              >
                <AddCircleOutlineIcon />
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
      {/* ****** */}
      {/* ****** */}
    </div>
  );
};
