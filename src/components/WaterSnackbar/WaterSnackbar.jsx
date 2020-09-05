import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import OpacityIcon from '@material-ui/icons/Opacity';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';



class WaterSnackbar extends Component {
  state = {
    open: false,
  };

  handleClick = (plant) => {
    this.setState({ open: true });
    console.log(plant)
    this.props.dispatch({ type: 'WATER_PLANT', payload: plant });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  waterPlant = (plant) => {;
    console.log('mark watered', plant)
    // this.props.dispatch({ type: 'WATER_PLANT', payload: plant });
    // let id = this.props.match.params.plant_id;
    // this.props.dispatch({ type: 'GET_DETAILS', payload: id })
}

  render() {
    return (
      <div>
        <Button onClick={() => this.handleClick(this.props.plant)} className='iconBtn'>
                                    <OpacityIcon /> </Button>
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
          message={<span id="message-id">Plant watered</span>}
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



export default connect(mapStoreToProps)(WaterSnackbar);