import React, { useReducer } from "react";
import { AppHead } from "../addOns/AppHead";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import { Button, Grid } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./appLogedIn.css";
import { Card, CardContent } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

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

const bookmarksReducer = (state, action) => {
  switch (action.type) {
    case "addBookmark":
      return [
        {
          id: Math.floor(Math.random() * 100000000000000),
          desc: action.payload.desc,
          url: action.payload.url,
        },
        ...state,
      ];
  }
};

const useStyles = makeStyles((theme) => ({
  viewButton: {
    background: "rgb(255, 60, 0)",
    "&:hover": {
      backgroundColor: "rgba(0, 128, 0, 0.733)",
    },
    textDecoration: "none",
    color: "white",
  },
}));

export const AppLogedIn = () => {
  //  useStyles
  const classes = useStyles();
  const [bookmarks, dispatch] = useReducer(bookmarksReducer, []);
  console.log("from reducer", bookmarks);
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
              .max(25, "Must be 25 characters or less")
              .required("Kindly add Description"),
            url: Yup.string()
              .matches(
                /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                "Enter correct url!"
              )
              .required("Please enter website"),
          })}
          onSubmit={(values, onSubmitProps) => {
            dispatch({ type: "addBookmark", payload: values });
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
      {/* Display Portion */}
      {/* ****** */}
      {/* ****** */}
      {bookmarks.length === 0 ? (
        <div className='taskScreen taskScreenE'>
          <p>No Saved Bookmarks</p>
        </div>
      ) : (
        <div className='bookmarkScreen'>
          <div className='bookMarksContainer'>
            <Grid container className='bookmarkGrid'>
              {bookmarks.map((bookmark, i) => (
                <Grid
                  key={i}
                  item
                  xs={8}
                  md={2}
                  component={Card}
                  className='bookmarkCard'
                >
                  <CardContent>
                    <h3 className='bookmarkName'>
                      <strong>{bookmark.desc}</strong>
                    </h3>
                    <div className='viewDiv'>
                      <Button
                        variant='contained'
                        focusRipple
                        className={classes.viewButton}
                        aria-label='visit'
                        onClick={() => {
                          alert("view");
                        }}
                      >
                        Visit
                      </Button>
                    </div>
                    <div className='editdeleteButtons'>
                      <Button
                        aria-label='delete'
                        onClick={() => {
                          alert("delete");
                        }}
                      >
                        <DeleteForeverIcon style={{ color: "red" }} />
                      </Button>
                      <Button
                        aria-label='Edit'
                        onClick={() => {
                          alert("edit");
                        }}
                      >
                        <EditIcon style={{ color: "blue" }} />
                      </Button>
                    </div>
                  </CardContent>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
      {/* ****** */}
      {/* ****** */}
    </div>
  );
};
