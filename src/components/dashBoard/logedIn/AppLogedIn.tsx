import React, { useReducer, useState, useEffect } from "react";
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
import SaveIcon from "@material-ui/icons/Save";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_BOOKMARKS = gql`
  query GetBookmarks {
    bookmarks {
      id
      desc
      url
    }
  }
`;
const DELETE_BOOKMARK = gql`
  mutation deleteBookmark($id: String!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`;
const ADD_BOOKMARK = gql`
  mutation AddBookmark($desc: String!, $url: String!) {
    addBookmark(desc: $desc, url: $url) {
      id
    }
  }
`;
const UPDATE_BOOKMARK = gql`
  mutation updateBookmark($id: String!, $desc: String!, $url: String!) {
    updateBookmark(id: $id, desc: $desc, url: $url) {
      id
    }
  }
`;

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
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingDesc, setEditingDesc] = useState("");
  const [editingUrl, setEditingUrl] = useState("");
  const [addBookmark] = useMutation(ADD_BOOKMARK);
  const { loading, error, data, refetch } = useQuery(GET_BOOKMARKS);
  const [deleteBookmark] = useMutation(DELETE_BOOKMARK);
  const [updateBookmark] = useMutation(UPDATE_BOOKMARK);

  const initialValuesEditing: BookmarkProps = {
    desc: editingDesc,
    url: editingUrl,
  };
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
              .min(3, "Atleast 3 letters")
              .max(25, "Atmost 25 letters")
              .required("Add Title"),
            url: Yup.string()
              .matches(
                /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                "Enter correct url!"
              )
              .required("Enter url"),
          })}
          onSubmit={async (values, onSubmitProps) => {
            await addBookmark({
              variables: { desc: values.desc, url: values.url },
            });
            onSubmitProps.resetForm();
            await refetch();
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
                label='Title'
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
      {loading ? (
        <div className='taskScreen taskScreenE'>
          <p>Loading...</p>
        </div>
      ) : !data ? (
        <div className='taskScreen taskScreenE'>
          <p>No Saved Bookmarks</p>
        </div>
      ) : data.bookmarks.length === 0 ? (
        <div className='taskScreen taskScreenE'>
          <p>No Saved Bookmarks</p>
        </div>
      ) : (
        <div className='bookmarkScreen'>
          <div className='bookMarksContainer'>
            <Grid container className='bookmarkGrid'>
              {data.bookmarks.map((bookmark, i) => (
                <Grid
                  key={i}
                  item
                  xs={8}
                  md={3}
                  component={Card}
                  className='bookmarkCard'
                >
                  {!editing || editingId !== bookmark.id ? (
                    <CardContent>
                      <h3 className='bookmarkName'>
                        <strong>{bookmark.desc}</strong>
                      </h3>
                      <div className='viewDiv'>
                        <a
                          href={`${bookmark.url}`}
                          target='_blank'
                          className='link'
                        >
                          <Button
                            variant='contained'
                            focusRipple
                            className={classes.viewButton}
                            aria-label='visit'
                          >
                            Visit
                          </Button>
                        </a>
                      </div>
                      <div className='editdeleteButtons'>
                        {console.log(bookmark.id)}
                        <Button
                          aria-label='delete'
                          onClick={async () => {
                            await deleteBookmark({
                              variables: { id: bookmark.id },
                            });
                            await refetch();
                          }}
                        >
                          <DeleteForeverIcon style={{ color: "red" }} />
                        </Button>
                        <Button
                          aria-label='Edit'
                          onClick={() => {
                            setEditingId(bookmark.id);
                            setEditingDesc(bookmark.desc);
                            setEditingUrl(bookmark.url);
                            setEditing(true);
                          }}
                        >
                          <EditIcon style={{ color: "blue" }} />
                        </Button>
                      </div>
                    </CardContent>
                  ) : (
                    <div className='formm'>
                      <Formik
                        initialValues={initialValuesEditing}
                        validationSchema={Yup.object({
                          desc: Yup.string()
                            .min(3, "Too Short")
                            .max(25, "Too Long")
                            .required("Enter Title"),
                          url: Yup.string()
                            .matches(
                              /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                              "Correct url!"
                            )
                            .required("Enter url"),
                        })}
                        onSubmit={async (values, onSubmitProps) => {
                          await updateBookmark({
                            variables: {
                              id: editingId,
                              desc: values.desc,
                              url: values.url,
                            },
                          });
                          await refetch();
                          onSubmitProps.resetForm();
                          setEditing(false);
                        }}
                      >
                        <Form className='formControl1'>
                          <div className='fieldsDiv2'>
                            <Field
                              as={TextField}
                              required
                              variant='outlined'
                              className='fields'
                              name='desc'
                              label='Title'
                              helperText={
                                <ErrorMessage name='desc'>
                                  {(msg) => (
                                    <span className='error errorEdit'>
                                      {msg}
                                    </span>
                                  )}
                                </ErrorMessage>
                              }
                            />
                          </div>
                          <div className='fieldsDiv2'>
                            <Field
                              as={TextField}
                              required
                              variant='outlined'
                              className='fields'
                              name='url'
                              label='URL'
                              helperText={
                                <ErrorMessage name='url'>
                                  {(msg) => (
                                    <span className='error errorEdit'>
                                      {msg}
                                    </span>
                                  )}
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
                              <SaveIcon />
                            </Button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                  )}
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
      {error ? (
        <div className='taskScreen taskScreenE'>
          <p>Some error occurred.</p>
          <p>Come Back Later.</p>
        </div>
      ) : null}
      {}
      {/* ****** */}
      {/* ****** */}
    </div>
  );
};
