import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./footer.css";

const Footer = () => {
  return (
    <div>
      <React.Fragment>
        <AppBar
          position='static'
          color='transparent'
          className='right'
          elevation={0}
        >
          <Toolbar>
            <div className='grow' />
            <Typography variant='body1' className='titleFooter'>
              <small>by: </small>Hassan Ali Khan
            </Typography>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
};

export default Footer;
