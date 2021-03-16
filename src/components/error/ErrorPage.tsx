import React from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import "./errorPage.css";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  componentGrid: {
    backgroundColor: "whitesmoke",
    padding: "20px",
    border: "0",
  },
  toHomeButton: {
    backgroundColor: "rgba(255, 60, 0, 0.753)",
    textDecoration: "none",
    width: "50%",
    alignSelf: "center",
  },
}));

export const ErrorPage = () => {
  const classes = useStyles();
  return (
    <div className='errorContainer'>
      <Grid container className={classes.mainGrid}>
        <Grid
          item
          xs={8}
          md={5}
          component={Card}
          className={classes.componentGrid}
          elevation={0}
        >
          <CardContent>
            <StaticImage
              className='errorImage'
              src='../../asserts/err.png'
              alt='LandingImage'
              placeholder='tracedSVG'
            />
          </CardContent>
        </Grid>
        <Grid
          item
          xs={8}
          md={5}
          component={Card}
          className={classes.componentGrid}
          elevation={0}
        >
          <CardContent className='errorContent'>
            <Typography
              variant='h4'
              align='center'
              gutterBottom
              className='errorTitle'
            >
              BookMarker
            </Typography>
            <Typography variant='h6' gutterBottom className='errorDetail'>
              This page does not exist.
            </Typography>
            <Typography variant='h6' gutterBottom className='errorDetail'>
              Kindly navigate to home page and start again.
            </Typography>
            <Button
              variant='contained'
              className={classes.toHomeButton}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
