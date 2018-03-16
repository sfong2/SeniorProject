import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../../redux/reducer';
import {Redirect} from 'react-router-dom'

//import {Redirect} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    render(){
        let{email, password} = this.state;
        let {isLoginPending, isLoginSuccess, loginError} = this.props;

        return(

            <form className="offset-md-4" name="loginForm" onSubmit={this.onSubmit} style={{marginTop: 100}}>
                <div className = "col-md-6">
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => this.setState({email: e.target.value})} value={email}/>
                    <medium id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</medium>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => this.setState({password: e.target.value})} value={password}/>
                </div>
                <button type="submit" class="btn btn-outline-primary" value="Login">Login</button>
                </div>
                <div className="message">
                    {isLoginPending && <div> Please wait...</div>}
                    {isLoginSuccess && <div> Success.</div>}
                    {loginError && <div> Incorrect Username or Password.</div>}
                </div>
                <div>
                    {isLoginSuccess && <div><Redirect to='/data'></Redirect></div>}
                </div>
            </form>
        )
    }

    onSubmit(e){
        e.preventDefault();
        let{email, password} = this.state;
        this.props.login(email, password);
        this.setState({
            email: '',
            password: ''
        });
    }
}

const mapStateToProps = (state) => {
    return{
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (email, password) => dispatch(login(email,password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);