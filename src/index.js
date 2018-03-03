import React from 'react';
//import ReactDOM from 'react-dom';

import App from './App';

//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));