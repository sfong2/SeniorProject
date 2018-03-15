import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => (
    <header>
            <div className="logo">
                <h1> CJS Connection </h1>
                </div>

                <nav>
                    <ul>
                        <li className = "first">
                             <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                             <Link to='/about'>About</Link>
                        </li>
                        <li className = "last">
                            <Link to='/contact'>Contact</Link>
                        </li>
                        </ul>
                    </nav>
            </header>
)
export default Header;