import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import Patient from './components/Patient';
import Doctor from './components/Doctor';
import PatientView from './components/PatientView';
import DoctorView from './components/DoctorView';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route  path="/Patient" component={Patient} />
        <Route  path="/Doctor" component={Doctor} />
        <Route path="/Patient_View/:id" component={PatientView}/>
        <Route path="/Doctor_View/:id" component={DoctorView}/>
       
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
