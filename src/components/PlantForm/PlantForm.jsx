import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, InputLabel } from '@material-ui/core';
import './PlantForm.css';


// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PlantForm extends Component {
    state = {
        newPlant: {
        plantName: '',
        seedStart: '',
        hardenOff: '',
        plantOutdoors: '',
        imagePath: '',
        notes: ''}
    };

        //tracks form changes
        handleChange = (event, propertyName) => {
            this.setState({
                ...this.state,
                newPlant:
                {...this.state.newPlant,
                    [propertyName]: event.target.value}
            })
        }

        addPlant = (event) => {
            event.preventDefault();
            console.log(this.state.newPlant)
            this.props.dispatch({type: 'ADD_PLANT', payload: this.state.newPlant})
            this.setState({
                ...this.state,
                newPlant:
                {plantName: '',
                    seedStart: '',
                    hardenOff: '',
                    plantOutdoors: '',
                    imagePath: '',
                    notes: '' }
            })
        }

    render() {
        return (

            <div className='formDiv' >
                <form onSubmit={this.addPlant}>
                <div className='inputContainer'>
                    <div>
                        <InputLabel>Plant Name*</InputLabel>
                        <TextField
                            variant="outlined"
                            type='text' className='formInputs'
                            defaultValue={this.state.plantName}
                            onChange={(event) => this.handleChange(event, 'plantName')}
                            required />
                    </div>
                    <div>
                        <InputLabel>Start Seed Date</InputLabel>
                        <TextField
                            variant='outlined'
                            defaultValue={this.state.seedStart}
                            id='seedStart' className='formInputs'
                            onChange={(event) => this.handleChange(event, 'seedStart')}
                            type='date' />
                    </div>
                    <div>
                        <InputLabel>Harden Off Date</InputLabel>
                        <TextField
                            variant='outlined'
                            id='hardenOff' className='formInputs'
                            defaultValue={this.state.hardenOff}
                            onChange={(event) => this.handleChange(event, 'hardenOff')}
                            type='date' />
                    </div>
                    <div>
                        <InputLabel>Plant Outdoors*</InputLabel>
                        <TextField
                            variant='outlined' className='formInputs'
                            id='plantOutdoors'
                            defaultValue={this.state.plantOutdoors}
                            onChange={(event) => this.handleChange(event, 'plantOutdoors')}
                            type='date' />
                    </div>
                    </div>
                    <div className='inputContainer'>
                    <div>
                        <InputLabel>Image Path*</InputLabel>
                        <TextField
                            variant='outlined' className='formInputs'
                            id='imagePath'
                            defaultValue={this.state.imagePath}
                            onChange={(event) => this.handleChange(event, 'imagePath')}
                            type='text' />
                    </div>
                    <div>
                        <InputLabel>Notes</InputLabel>
                        <TextField
                            defaultValue={this.state.notes}
                            variant='outlined' className='formInputs'
                            id='notes' style={{ width: 400 }}
                            onChange={(event) => this.handleChange(event, 'notes')}
                            type='text' />
                    </div>
                    <Button color='secondary' type='submit'>Add Plant</Button>
                </div>
                </form>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PlantForm);