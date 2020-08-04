import React, { useEffect } from "react";
import "./App.css";
import { API } from "./services/api-services";

import MapComponent from "./Components/MapComponent/MapComponentRender";

function App() {
  return (
    <>
      <MapComponent />
    </>
  );
}

export default App;
