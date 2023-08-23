import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>React</b>JS
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={e => setUser({...user, username: e.target.value})}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={e => setUser({...user, password: e.target.value})}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              {JSON.stringify(user)}

              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
              <div className="row" style={{marginTop : 10}}>
                <div className="col-12">
                  <button 
                    className="btn btn-default btn-block"
                    onClick={() => navigate("/login")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
      {/* /.login-box */}
    </div>
  )
}

export default Register
