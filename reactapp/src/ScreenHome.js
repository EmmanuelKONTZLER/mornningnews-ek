import React, { useState } from 'react';
import './App.css';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function ScreenHome(props) {

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState([])
  const [signupResult, setSignupResult] = useState(false)
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signinError, setSigninError] = useState([]);
  const [signinResult, setSigninResult] = useState(false);
  const [userToken, setUserToken] = useState('');

  // Fonctions ↓↓↓

  var signup = async (signupName, signupEmail, signupPassword) => {    
    var newUser = await fetch('/users/sign-up', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `name=${signupName}&email=${signupEmail}&password=${signupPassword}`
    });
    newUser = await newUser.json();
    setUserToken(newUser.token);
    setSignupError(newUser.error);
    setSignupResult(newUser.result);

  }

  var signin = async (signinEmail, signinPassword) => {    
    var user = await fetch('/users/sign-in', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${signinEmail}&password=${signinPassword}`
    });
    user = await user.json()
    console.log("user.token", user.token)
    setUserToken(user.token)
    setSigninError(user.error)
    setSigninResult(user.result)
 
  }

  console.log("token in state", userToken, signinResult)

  if (signinResult || signupResult) {
    console.log("token before redux", userToken)
    props.addToken(userToken)
    return (
      <Redirect to='/screensource' />
    )
  }


  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  
            <Input 
            className="Login-input" 
            placeholder="arthur@lacapsule.com"
            onChange={(e) => setSigninEmail(e.target.value)}
            value={signinEmail}
            />

            <Input.Password 
            className="Login-input" 
            placeholder="password"
            onChange={(e) => setSigninPassword(e.target.value)}
            value={signinPassword}
              />
            {signinError.length != 0 ?
              signinError.map((error, i) => {
                return (
                  <p>{error}</p>
                )
              })
              :
              <></>
            }

            <Button 
            onClick={()=> signin(signinEmail, signinPassword)} 
            style={{width:'80px'}} 
            type="primary">
              Sign-in
            </Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  
            <Input 
            className="Login-input"
            placeholder="Arthur G" 
            onChange={(e) => setSignupName(e.target.value)}
            value={signupName}
            />

            <Input 
            className="Login-input" 
            placeholder="arthur@lacapsule.com"
            onChange={(e) => setSignupEmail(e.target.value)}
            value={signupEmail}
            />

            <Input.Password 
            className="Login-input" 
            placeholder="password"
            onChange={(e) => setSignupPassword(e.target.value)}
            value={signupPassword}
              />
            {signupError.length != 0 ?
              signupError.map((error, i) => {
                return (
                  <p>{error}</p>
                )
              })
              :
              <></>
            }

            <Button 
            onClick={()=> signup(signupName, signupEmail, signupPassword)} 
            style={{width:'80px'}} 
            type="primary">
              Sign-up
            </Button>

          </div>

      </div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    addToken: function(token) {
    dispatch( {type: 'addToken', token: token } )
    }
  }
}
  
export default connect(
null,
mapDispatchToProps
)(ScreenHome);
