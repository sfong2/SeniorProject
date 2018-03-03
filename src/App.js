import React from 'react';

//import ReactDOM from 'react-dom';
//import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
//import Homepage from './components/pages/homePage';
import Main from './components/Main';

import './Assets/css/default.min.css';

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Header />

          <Homepage />

        <Footer />

      </div>
    );
  }
}
*/

const App = () => (
  <div className="App">
        
  <Header />

    <Main />

  <Footer />

</div>
)

export default App;
