import React, { useContext } from "react";
import { IdentityContext } from "../../identity-context";
import { Helmet } from "react-helmet";
import Layout from "../components/addOns/Layout";
import { AppLogedIn } from "../components/dashBoard/logedIn/AppLogedIn";
import { AppLogedOut } from "../components/dashBoard/logedOut/AppLogedOut";

export default function app() {
  const { user } = useContext(IdentityContext);
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>BookMarker | Dashboard</title>
        </Helmet>
        <Layout>
          <AppLogedOut />
        </Layout>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>BookMarker | Dashboard</title>
      </Helmet>
      <Layout>
        <AppLogedIn />
      </Layout>
    </div>
  );
}
