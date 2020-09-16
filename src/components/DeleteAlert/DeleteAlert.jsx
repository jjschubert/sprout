import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  //sends delete request to server
  const deletePlant = () => {
      console.log(props);
      setOpen(false);
      axios({
        method: 'DELETE',
        url: `/api/plants/${props.id}`
    }).then((response) => {
        setOpen(false);
       if (props.type === 'fromEdit') {
        history.push({
        pathname:  "/Dashboard"})}
        else {
          dispatch({type: 'FETCH_TASK_OBJ'})
        }
       //need to dispatch to taskObj from here
    }).catch(error => {
        console.log('error in DELETE', error);
    })
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
      <Button style={{color: '#9e9e9e'}} onClick={handleClickOpen}>
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
