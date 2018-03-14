import React from 'react';
import {Link} from 'react-router-dom'

/*
class Header extends Component {
  render() {
    return (
        <header>
            <div className="logo">
                CJS connection
                </div>

                <nav>
                    <ul>
                        <li className = "first">
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li className = "last">
                            <a href="/#/contact">Contacts</a>
                        </li>
                        </ul>
                    </nav>
            </header>
    );
  }
}
*/

const Header = () => (
    <header>
            <div className="logo">
                <h1> CJS Connection </h1>
                </div>

                <nav>
                    <ul>
                        <li className = "first">
                            <a> <Link to='/'>Home</Link></a>
                        </li>
                        <li>
                            <a> <Link to='/login'>Login</Link></a> 
                        </li>
                        <li>
                            <a> <Link to='/login2'>Login2</Link></a> 
                        </li>
                        <li>
                            <a> <Link to='/data'>Data</Link></a>
                        </li>
                        <li>
                            <a> <Link to='/about'>About</Link></a>
                        </li>
                        <li className = "last">
                            <a> <Link to='/contact'>Contact</Link></a>
                        </li>
                        </ul>
                    </nav>
            </header>
)
export default Header;