import React from 'react';
import { Box } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NotificationIcon from '../NotificationIcon/NotificationIcon';
import TempDrawer from './TempDrawer.js'



function TempNav(props) {


    let loginLinkData = {
        path: '/login',
        text: 'Login / Register',
    };

    let aboutData = {
        path: '/about',
        text: 'About'
    }

    if (props.store.user.id == null) {
        aboutData.path = '/about';
        aboutData.text = 'About';
    }

    if (props.store.user.id != null) {
        loginLinkData.path = '/dashboard';
        loginLinkData.text = 'Home';
    }

    return (
    
            <AppBar
                position="static"
            
            >
                <Toolbar>
                <Box display='flex' flexGrow={1}>
                    <Link to="/home">
                        <h2 className="nav-title">Sprout</h2>
                    </Link>
                    </Box>
                    <div className="nav-right">
                    <NotificationIcon />
                    <Link className="nav-link" to={loginLinkData.path}>
                        {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
                        {loginLinkData.text}
                    </Link>
                    {props.store.user.id ? <></> :
                        <Link className="nav-link" to={aboutData.path}>
                            {aboutData.text}
                        </Link>}


                    {props.store.user.id &&
                        <TempDrawer style={{display: 'inline'}}/>}
                        </div>
                </Toolbar>
            </AppBar>    
      
    );
}

export default connect(mapStoreToProps)(TempNav);
