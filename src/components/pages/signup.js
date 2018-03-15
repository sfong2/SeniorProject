import React from 'react';

const Signup = () => (
    <form>
      <h1>Join our community!</h1>
      <div classNmae="form-group">
        <label className="control-label"></label>
        <input
          type="text"
          name="username"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-lg">
            Sign up
        </button>
      </div>
    </form>
)

export default Signup;