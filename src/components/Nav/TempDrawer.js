import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function TempDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {props.store.user.id &&
                    <ListItem>
                        {/* <ListItemIcon><NotificationIcon /></ListItemIcon> */}
                        <ListItemText>
                            <Link className='drawer-link' to='/tasks'>Tasks</Link></ListItemText></ListItem>
                }
                {props.store.user.id &&
                    <ListItem>
                        <Link className='drawer-link' to='/dashboard'>Your Garden</Link></ListItem>
                }
                {props.store.user.id &&
                    <ListItem>
                        <Link className='drawer-link' to='/add'>Add Plants</Link>
                    </ListItem>
                }

            </List>
            <Divider />
            <List>
                <ListItem>
                    <Link className="drawer-link" to="/about">
                        About
                        </Link></ListItem>
                {props.store.user.id && (
                    <ListItem> <LogOutButton className="drawer-link" /></ListItem>
                )}
            </List>
        </div>
    );

    return (
        <div className='nav-hamburger'>
          <Button onClick={toggleDrawer('right', true)}><MenuIcon style={{color: 'white'}} /></Button>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </div>
    );
}

export default connect(mapStoreToProps)(TempDrawer);