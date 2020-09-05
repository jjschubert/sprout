import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

class EditModule extends Component {
  state = {
    open: false,
    plant: {
        lastWater: ''

    }
  };

  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    console.log(this.props.plant)
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Edit Plant
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Plant</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Last fertilized"
              fullWidth
              variant="outlined"
              defaultValue={moment(this.props.store.details[0].last_fertilize).format('MMMM Do')}
            />
            <TextField
              margin="dense"
              label="Last watered"
              fullWidth
              variant="outlined"
              defaultValue={moment(this.props.store.details[0].last_water).format('MMMM Do')}
            />

            {this.props.store.details.map((item) => {
                return(
                <TextField key={item.type_id}
                margin="dense"
                label={item.description}
                defaultValue={moment(item.due_date).format('MMMM Do')}
                fullWidth
                variant="outlined"
              />
                )
            })}
            <TextField
              margin="dense"
              label="Notes"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              defaultValue={this.props.store.details[0].notes}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditModule);
