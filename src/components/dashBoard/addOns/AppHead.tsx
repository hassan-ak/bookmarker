import { Button } from "@material-ui/core";
import React from "react";
import "./appHead.css";
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { navigate } from "gatsby";
import { useContext } from "react";
import { IdentityContext } from "../../../..//identity-context";

export const AppHead = () => {
  const { identity: netlifyIdentity } = useContext(IdentityContext);
  return (
    <div className='appHead'>
      <div className='toHomeButton'>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon style={{ color: "rgba(255, 60, 0, 0.753)" }} />
        </Button>
      </div>
      <div className='logOutButton'>
        <Button
          onClick={() => {
            netlifyIdentity.logout();
          }}
        >
          <PowerSettingsNewIcon style={{ color: "rgb(199, 95, 212)" }} />
        </Button>
      </div>
    </div>
  );
};
