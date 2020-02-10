import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Layout/NavBar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/projects/CreateProject";
import ProjectDetails from "./components/projects/ProjectDetails";

import { AuthStoreProvider } from "./AuthStore";
import { ProjectStoreProvider } from "./ProjectStore";

function App() {
  return (
    <AuthStoreProvider>
      <ProjectStoreProvider>
        <BrowserRouter>
          <div className="App">
            <CssBaseline />
            <Navbar />
            <Switch>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/createproject">
                <CreateProject />
              </Route>
              <Route path="/updateproject/:id">
                <CreateProject />
              </Route>
              <Route path="/project/:id">
                <ProjectDetails />
              </Route>
              <Route exact path="/">
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </ProjectStoreProvider>
    </AuthStoreProvider>
  );
}

export default App;
