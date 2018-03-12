import React from 'react';
import img from '../../Assets/Capture.PNG';
const Homepage = () => (
 
  <div className = "container-fluid">
    
    <h2>Welcome to CJS Connection!</h2>
    <img src={img} alt="logo"/> 
    <h4>  The company provides a tool that benefits Amazon third-party sellers 
      to optimize their advertising performance through data mining. This website utilizes the 
      requested data from Amazon server, analyzes the data, displays graph, and outputs keywords 
      that customers most use to find their products to the seller. We have developed a function that 
      displays positive keywords to their Amazon seller central. Along with block out negative
      keywords that would not help with selling their commodity on Amazon. Therefore, increasing exposure 
      and decreasing the seller’s competition with other companies.
    </h4>
   
  </div>
)
/*
class Homepage extends Component {
  render() {
    return (
        <div className = "container-fluid">
            Welcome to CJS Connection!
        </div>
    );
  }
}*/


export default Homepage;