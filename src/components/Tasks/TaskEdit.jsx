import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from '@material-ui/core/';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import './Tasks.css';

class taskEdit extends Component {
    state = {
        open: false,
        id: this.props.task.id,
        due_date: this.props.task.due_date
    };


    //open edit module
    handleClickOpen = () => {
        this.setState({ open: true,
        });
        console.log(this.state)
    };

    //close edit module w/o saving
    handleClose = () => {
        this.setState({ open: false });
    };

    //submit changes and close module
    handleSubmit = () => {
        console.log(this.state)
        this.props.dispatch({type: 'UPDATE_TASK', payload: this.state})
        this.props.dispatch({type: 'FETCH_TASKS'})
        this.props.dispatch({type: 'FETCH_OVERDUE_TASKS'})
        this.setState({ open: false });
    };

    //handles form inputs
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
                [propertyName]: event.target.value,
        })
    }

    render() {

        return (
            <div className='inline'>
                <IconButton className='inline right' onClick={this.handleClickOpen}>
                    <CreateIcon />
        </IconButton>
            
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Update Task</DialogTitle>
                    <DialogContent>
                    
                        <TextField
                            margin="dense" 
                            type='date'
                            fullWidth
                            variant="outlined"
                            label='Due Date'
                            defaultValue={this.props.task.due_date ?
                                moment(this.props.task.due_date).format('yyyy-MM-DD')
                                : "yyyy-MM-dd"}
                            required onChange={(event) => this.handleChange(event, 'due_date')}
                        />    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            Save Changes
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(taskEdit);
