import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import HomePage from './components/home';

import {
 BrowserRouter as Router,
 Switch,
 Route,
 Link
} from "react-router-dom";
import Restaurant from './components/restaurant';

// const App = () => <>Hello World!</>;
//const App = () => <HomePage/>

const App = (props) =>{
 return (
  <Router>
      <div>
        <Switch>
          <Route path="/restaurant" {...props} >
            <Restaurant />
          </Route>
          <Route path="/">
          <HomePage/>
          </Route>
        </Switch>
      </div>
    </Router>
 )
}

render(<App />, document.getElementById('root'));
