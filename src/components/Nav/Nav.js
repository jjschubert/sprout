import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NotificationIcon from '../NotificationIcon/NotificationIcon';




const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  

  if (props.store.user.id != null) {
    loginLinkData.path = '/dashboard';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <div className="nav-left">
      <Link to="/home">
        <h2 className="nav-title">Sprout</h2>
      </Link>
      </div>
      <div className="nav-right">
      
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {/* show the tasks page if the user is logged in */}
        {props.store.user.id && 
        
          <Link className='nav-link' to='/tasks'>Tasks</Link>
          
        }
        <NotificationIcon />
         {props.store.user.id && 
          <Link className='nav-link' to='/add'>Add Plants</Link>
        }
     
        {/* Show the link to the logout button if the user is logged in */}
        {props.store.user.id && (
            <LogOutButton className="nav-link" />
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/about">
          About
        </Link>
        {/* <Drawer /> */}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
