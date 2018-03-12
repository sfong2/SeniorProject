import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Homepage from './pages/homePage';
import About from './pages/about';
import Login from './pages/login';
import Login2 from './pages/login2';
//import Signup from './pages/signup';
import Contact from './pages/contact';

const Main = () =>(
    <main>
        <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route path='/about' component={About}/>
            <Route path='/login' component={Login}/>
            <Route path='/login2' component={Login2}/>
            <Route path='/contact' component={Contact}/>
        </Switch>
    </main>
)

export default Main