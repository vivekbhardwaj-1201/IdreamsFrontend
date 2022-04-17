import React from 'react';
import {
  Link
} from "react-router-dom";
// import Home from '../../../../home/Home';
// import Login from '../../../../login/Login';
// import Register from '../../../../register/Register';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
      <div className={classes.sideMenuOuter}>
        <div className='side-menu'>
          <div className='logo'>
            <img src=''/>
            <ul className={classes.menuItemOuter}>
              <li className={classes.menuItemActive}>Overview</li>
              <li className={classes.menuItem}>Stats</li>
              <li className={classes.menuItem}>Projects</li>
              <li className={classes.menuItem}>Chats</li>
              <li className={classes.menuItem}>Calender</li>
            </ul>
            <ul className={classes.footer}>
              <li className={classes.menuItem}>Settings</li>
              <li className={classes.menuItem} onClick={props.onLogout} >Log Out</li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navigation;
