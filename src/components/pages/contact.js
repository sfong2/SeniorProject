import React from 'react';

/*
class Contact extends Component {
  render() {
    return (
        <div className = "contact">
            Welcome to CJS Connection's Contact Page!
        </div>
    );
  }
}
*/

const Contact = () => (
  <div className = "container-fluid">
    <h1> Contact Us</h1>
      <h4>Please contact the right department for you.</h4>
      <h3> Login</h3>
       <h4><b>Email:</b><a hef= "https://www.google.com/gmail/" target = "_blank"> sfong2@uci.edu</a></h4>
      <h3> Data Management</h3>
        <h4><b>Email:</b><a hef= "https://www.google.com/gmail/" target = "_blank"> junl14@uci.edu</a></h4>
      <h3> Information Display or Other Questions </h3>
        <h4><b>Email:</b><a hef= "https://www.google.com/gmail/" target = "_blank"> cgorgoni@uci.edu</a></h4>
  </div>
)

export default Contact;