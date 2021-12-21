import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render (
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={TaskList}/>
                    <Route path="/new-task" component={TaskForm}/>
                    <Route path="/update-task/:id" component={TaskForm}/>
                </Switch>
            </div>
            <ToastContainer />
        </BrowserRouter>
    </React.StrictMode>,    
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
