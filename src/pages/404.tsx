import React from "react";
import { Helmet } from "react-helmet";

export default function Error() {
  return (
    <div>
      <Helmet>
        <title>Bookmarker | 404</title>
      </Helmet>
      <div>Error Page</div>
    </div>
  );
}
