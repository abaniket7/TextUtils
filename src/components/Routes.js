import React from 'react'
import TextForm from './components/TextForm'
import About from './components/About';
import {
  Switch,
  Route,
} from "react-router-dom";

const Routes =  (props)=> {
    <Switch>
      <Route path='/About'>
        <About aboutText="About Us"/>
      </Route>
      <Route path='/'>
        <TextForm head="Enter Your Text Here :" mode={props.mode} showAlert={props.showAlert}/>
      </Route>
    </Switch>
}
export default Routes;
