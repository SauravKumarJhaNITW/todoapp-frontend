import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/common/navBar";
import TodoList from "./components/todoList";
import DoneList from "./components/doneList";
import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import NotFound from "./components/common/notFound";
import TodoForm from "./components/todoForm";
import Profile from "./components/profile";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/todoList/:_id/:task" component={TodoForm} />
            <ProtectedRoute exact path="/todoList" component={TodoList} />
            <ProtectedRoute path="/doneList" component={DoneList} />
            <Redirect exact from="/" to="/todoList" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>{" "}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
