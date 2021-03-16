import React from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import "./landing.css";

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
  bookmarksButton: {
    backgroundColor: "rgba(255, 60, 0, 0.753)",
    textDecoration: "none",
    width: "50%",
    alignSelf: "center",
  },
}));

export const Landing = () => {
  const classes = useStyles();
  return (
    <div className='homeContainer'>
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
              className='homeImage'
              src='../../asserts/home.jpg'
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
          <CardContent className='homeContent'>
            <Typography
              variant='h4'
              align='center'
              gutterBottom
              className='homeTitle'
            >
              BookMarker
            </Typography>
            <Typography variant='body1' gutterBottom className='homeDetail'>
              Easiest way to remember websites you visit frequently or wanted to
              visit in future.
            </Typography>
            <Typography variant='body1' gutterBottom className='homeDetail'>
              You need to SignIn for using this app.
            </Typography>
            <Button
              variant='contained'
              className={classes.bookmarksButton}
              onClick={() => {
                alert("clicked");
              }}
            >
              Sign In
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
