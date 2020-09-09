import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Button, InputLabel, TextField, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core/';
import moment from 'moment';
import DeleteAlert from '../DeleteAlert/DeleteAlert'

class EditModule extends Component {
    state = {
        open: false,
        plant: {
            lastWater: this.props.store.details[0].last_water,
            lastFertilize: this.props.store.details[0].last_fertilize,
            notes: this.props.store.details[0].notes,
            1: null,
            2: null,
            3: null,
            id: this.props.id,

        }
    };


    //open edit module
    handleClickOpen = () => {
        this.setState({ open: true,
        plant:{
            ...this.state.plant,
            1: this.props.store.taskDetails[0].due_date,
            2: this.props.store.taskDetails[1].due_date,
            3: this.props.store.taskDetails[2].due_date
        } });
        console.log(this.state.plant)
    };

    //close edit module w/o saving
    handleClose = () => {
        this.setState({ open: false });
    };

    //submit changes and close module
    handleSubmit = () => {
        this.setState({ open: false });
        console.log(this.state.plant)
        this.props.dispatch({type: 'UPDATE_PLANT', payload: this.state.plant})
        this.props.dispatch({type: 'GET_DETAILS', payload: this.props.id})
    };

    //handles form inputs
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            plant: {
                ...this.state.plant,
                [propertyName]: event.target.value,
            }
        })
    }

    render() {

        return (
            <div className='inline'>
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                    Edit Plant
        </Button>
            
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Update Plant</DialogTitle>
                    <DialogContent>
                    <InputLabel htmlFor='lastWatered'>Last Watered</InputLabel>
                        <TextField
                            margin="dense" 
                            type='date'
                            fullWidth
                            variant="outlined"
                            id="lastWatered"
                            defaultValue={this.props.store.details[0].last_water ?
                                moment(this.props.store.details[0].last_water).format('yyyy-MM-DD')
                                : "yyyy-MM-dd"}
                            required onChange={(event) => this.handleChange(event, 'lastWater')}
                        />
                        <InputLabel htmlFor="lastFertilized">Last Fertilized</InputLabel>
                        <TextField
                            margin="dense"
                            fullWidth
                            type='date'
                            variant="outlined"
                            id="lastFertilized"
                            defaultValue={this.props.store.details[0].last_fertilize ?
                                moment(this.props.store.details[0].last_fertilize).format('yyyy-MM-DD')
                                : 'yyyy-MM-dd'}
                            required onChange={(event) => this.handleChange(event, 'lastFertilize')}
                        />
                       
                        {this.props.store.details.map((item) => {
                            let taskType = item.type_id;
                            if (item.due_date !== null) {
                            return (
                                <div key={item.type_id}>
                                <InputLabel>{item.description}*</InputLabel>
                                <TextField 
                                    margin="dense"
                                    defaultValue={moment(item.due_date).format('yyyy-MM-DD')}
                                    fullWidth
                                    type='date'
                                    variant="outlined"
                                    required onChange={(event) => this.handleChange(event, taskType)}
                                />
                                </div> 
                            )}
                            else return false;
                        })}
                        <TextField
                            margin="dense"
                            label="Notes"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            defaultValue={this.props.store.details[0].notes}
                            required onChange={(event) => this.handleChange(event, 'notes')}
                        />
                        
                    </DialogContent>
                    <DialogActions>
                    <DeleteAlert id={this.props.store.details[0].id}  history={this.props.history}/>
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

export default connect(mapStoreToProps)(EditModule);
