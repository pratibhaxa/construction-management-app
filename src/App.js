import React from "react";
import { CreateDocket } from "./components/CreateDocket";
import { Route, Routes } from "react-router-dom";
import { ViewDocket } from "./components/ViewDocket";
import { DocketTab } from "./UI/DocketTab";
import { Docket } from "./components/Docket";

function App() {
    return (
        <React.Fragment>
            <DocketTab />
            <Routes>
                <Route path="/" element = {<CreateDocket />}></Route>
                {/* <Route path="/" Component={CreateDocket} /> */}
                <Route path="/create-docket" Component={CreateDocket} />
                <Route path="/view-dockets" Component={ViewDocket} />
                {/* <Route path="/docket-tab" Component={DocketTab} /> */}
            </Routes>
        </React.Fragment>
        
    );
  }

export default App;