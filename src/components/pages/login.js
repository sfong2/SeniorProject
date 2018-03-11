/*import React from 'react';

const Login = () => (
  <div className = "container-fluid">
    Welcome to CJS Connection Login!
  </div>
)

export default Login;*/

import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';

const Auth = () => (
  <Router>
    <div>
      <AuthButton />

      <ul>
        <li>
          <Link to="/public">Public Tools</Link>
        </li>
        <li>
          <Link to="/protected">Private Tools</Link>
        </li>
      </ul>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/protected" component={Protected} />

    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb){
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb){
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({history}) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
          >
          Sign Out
        </button>
      </p>
    ) : (
      <p> You are not logged in. </p>
    )
);

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to= {{
          pathname: "/login",
          state: {from: props.location}
        }}
        />
      )
    }
  />
);

//Possible Issues with Commiting
const Public = () => <h3> Public </h3>
const Protected = () => <h3> Protected </h3>

class Login extends React.Component{
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({redirectToReferrer: true});
    });
  };
  
  render() {
    const {from} = this.props.location.state || {from: {pathname: "/"}};
    const {redirectToReferrer} = this.state;

    if(redirectToReferrer){
      return <Redirect to={from} />;
    }

    return(
      <div>
        <p> You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Auth;