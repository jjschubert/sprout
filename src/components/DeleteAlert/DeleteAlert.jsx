import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  //sends delete request to server
  const deletePlant = () => {
      console.log(props.id);
      setOpen(false);
    // axios({
    //     method: 'DELETE',
    //     url: `/feedback/${props.item.id}`
    // }).then((response) => {
    //     //add refresh here
    //     setOpen(false);
    //     props.getFeedback();
    // }).catch(error => {
    //     console.log('error in DELETE', error);
    // })
}

//controls confirmation dialoge
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
       <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
    
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this plant?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={deletePlant} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
