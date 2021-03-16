import React from "react";
import { navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import "./appLogedOut.css";

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

export const AppLogedOut = () => {
  const classes = useStyles();
  return (
    <div className='aloContainer'>
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
              className='aloImage'
              src='../../../asserts/denied.jpg'
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
          <CardContent className='aloContent'>
            <Typography
              variant='h4'
              align='center'
              gutterBottom
              className='aloTitle'
            >
              BookMarker
            </Typography>
            <Typography variant='h6' gutterBottom className='aloDetail'>
              You are not authorized to access this page.
            </Typography>
            <Typography variant='body1' gutterBottom className='aloDetail'>
              Kindly navigate to home page and Login again.
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
