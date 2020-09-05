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
            lastWater: this.props.store.details[0].last_water,
            lastFertilize: this.props.store.details[0].last_fertilize,
            notes: this.props.store.details[0].notes,
            1: null,
            2: null,
            3: null

        }
    };


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.setState({ open: false });
        console.log(this.state.plant)
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
                            label="Last watered"
                            fullWidth
                            variant="outlined"
                            defaultValue={this.props.store.details[0].last_water ?
                                moment(this.props.store.details[0].last_water).format('MMMM Do')
                                : 'never'}
                            required onChange={(event) => this.handleChange(event, 'lastWater')}
                        />
                        <TextField
                            margin="dense"
                            label="Last fertilized"
                            fullWidth
                            variant="outlined"
                            defaultValue={this.props.store.details[0].last_fertilize ?
                                moment(this.props.store.details[0].last_fertilize).format('MMMM Do')
                                : 'never'}
                            required onChange={(event) => this.handleChange(event, 'lastFertilize')}
                        />

                        {this.props.store.details.map((item) => {
                            let taskType = item.type_id;
                            return (
                                <TextField key={item.type_id}
                                    margin="dense"
                                    label={item.description}
                                    defaultValue={moment(item.due_date).format('MMMM Do')}
                                    fullWidth
                                    variant="outlined"
                                    required onChange={(event) => this.handleChange(event, taskType)}
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
                            required onChange={(event) => this.handleChange(event, 'notes')}
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

export default connect(mapStoreToProps)(EditModule);
