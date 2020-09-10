import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './Tasks.css'



class TaskSnackbar extends Component {
  state = {
    open: false,
  };

  //sends to db that task is complete, opens snackbar
  handleComplete = () => {
    this.setState({ open: true});
    this.props.dispatch({type: 'TASK_COMPLETE', payload: this.props.id})
    console.log(this.props.id)
    setTimeout(this.handleRefresh, 2000);
 
  };

  handleRefresh = () => {
    this.props.dispatch({type: 'GET_CURRENT_TASKS'});
    this.props.dispatch({type: 'GET_OVERDUE_TASKS'});
    this.props.dispatch({type: 'GET_UPCOMING_TASKS'});
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <div>
         <IconButton className='inline right' onClick={()=> this.handleComplete(this.props.id)} >
          <CheckCircleIcon  /> </IconButton>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Task complete!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}



export default connect(mapStoreToProps)(TaskSnackbar);