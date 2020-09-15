import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import NotificationIcon from '../NotificationIcon/NotificationIcon';
import './Nav.css'


const drawerWidth = 240;



const useStyles = makeStyles((customTheme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: customTheme.transitions.create(['margin', 'width'], {
            easing: customTheme.transitions.easing.sharp,
            duration: customTheme.transitions.duration.leavingScreen,
        }),
        marginBottom: 0,
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: customTheme.transitions.create(['margin', 'width'], {
            easing: customTheme.transitions.easing.easeOut,
            duration: customTheme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        marginTop: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: customTheme.spacing(0, 1),
        // necessary for content to be below app bar
        ...customTheme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: customTheme.spacing(3),
        transition: customTheme.transitions.create('margin', {
            easing: customTheme.transitions.easing.sharp,
            duration: customTheme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: customTheme.transitions.create('margin', {
            easing: customTheme.transitions.easing.easeOut,
            duration: customTheme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
 
}));

function NavDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
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
                        <IconButton style={{marginTop: 10}}
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            className={clsx(open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton >}
                        </div>
                </Toolbar>
            </AppBar>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />


            </main>
            {props.store.user.id &&
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    style={{margin: 0, padding: 0}}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
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
                        <Divider />
                        <ListItem>
                            <Link className="drawer-link" to="/about">
                                About
                        </Link></ListItem>
                        {props.store.user.id && (
                            <ListItem onClick={handleDrawerClose}><LogOutButton className="drawer-link" /></ListItem>
                        )}


                    </List>
                </Drawer>}
        </div>
    );
}

export default connect(mapStoreToProps)(NavDrawer);
