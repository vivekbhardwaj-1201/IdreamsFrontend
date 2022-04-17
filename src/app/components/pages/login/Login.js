import React, { useEffect, useReducer, useState } from 'react';

import Card from '../../common/UI/Card/Card';
import classes from './Login.module.css';
import Button from '../../common/UI/Button/Button';

const emailReducer = (state , action ) => {
  if(action.type === 'INPUT'){
    return {value: action.val, isValid : action.val.includes('@') };
  }
  if(action.type === 'BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid : false};
}

const passReducer = (state, action ) =>{
  if(action.type === 'INPUT'){
    return {value: action.val, isValid : action.val.trim().length > 6 };
  }
  if(action.type === 'BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6 }
  }
  return {value: '', isValid : false};
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailDispacher] = useReducer(emailReducer, { value: '', isValid: null});
  const [passState, passDispacher] = useReducer(passReducer , { value: '', isValid: null});

  const { isValid : isEmailValid } = emailState;
  const { isValid : isPassValid } = passState;

  useEffect( () => {
    const id = setTimeout(()=> {
      setFormIsValid(isEmailValid && isPassValid);
    }, 500);

    return () => {
      clearTimeout(id);
    }
  },[isEmailValid, isPassValid]);

  const emailChangeHandler = (event) => {
    emailDispacher({type: 'INPUT' , val : event.target.value});
  };

  const passwordChangeHandler = (event) => {
    passDispacher({type: 'INPUT' , val : event.target.value});
  };

  const validateEmailHandler = () => {
    emailDispacher({type: 'BLUR'});
  };

  const validatePasswordHandler = () => {
    emailDispacher({type: 'BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };
  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
