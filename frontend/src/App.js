import Postview from "./components/postview";
import Upload from "./components/upload";
import { BrowserRouter, Route, Routes  } from "react-router-dom";
import LandingPage from "./components/landing-page";
import Nav from "./components/nav";
import React from "react";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/postview" element={<><Nav/><Postview/></>}/>
            <Route path="/upload" element={<><Nav/><Upload/></>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
