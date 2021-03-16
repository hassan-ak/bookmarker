import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/addOns/Layout";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Bookmarker | Home</title>
      </Helmet>
      <div>
        <Layout>Home Page</Layout>
      </div>
    </div>
  );
}
