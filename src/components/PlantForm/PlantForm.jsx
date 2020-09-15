import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, InputLabel, Paper } from '@material-ui/core';
import './PlantForm.css';
import PlantTable from '../PlantTable/PlantTable.jsx'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';


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
            notes: ''
        },
        plantList: ''
    };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TASK_OBJ' });
        this.setState({
            ...this.state,
            plantList: this.props.store.taskObj
        })
    }

    //tracks form changes
    handleChange = (event, propertyName) => {
        this.setState({
            ...this.state,
            newPlant: {
                ...this.state.newPlant,
                [propertyName]: event.target.value
            }
        }
        )
    }

    addPlant = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PLANT', payload: this.state.newPlant })
        this.setState({
            ...this.state,
            newPlant: {
                plantName: '',
                seedStart: '',
                hardenOff: '',
                plantOutdoors: '',
                imagePath: '',
                notes: '',
            }
        })
        this.props.dispatch({ type: 'FETCH_TASK_OBJ' })
        console.log('got to fetch task obj')
    }

    render() {

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: { uploadType: 'avatar' },
        }
        const s3Url = 'https://veggiebucket.s3.amazonaws.com'

        return (
            <div>
                {this.props.store.taskObj[0] &&
                    <Paper style={{ paddingBottom: 25 }}>
                        <div className='formDiv' >
                            <form onSubmit={this.addPlant}>
                                <div className='inputContainer'>
                                    <div>
                                        <InputLabel>Plant Name*</InputLabel>
                                        <TextField
                                            variant="outlined"
                                            type='text' className='formInputs'
                                            defaultValue={this.state.newPlant.plantName}
                                            onChange={(event) => this.handleChange(event, 'plantName')}
                                            required />
                                    </div>
                                    <div>
                                        <InputLabel>Start Seed Date</InputLabel>
                                        <TextField
                                            variant='outlined'
                                            defaultValue={this.state.newPlant.seedStart}
                                            className='formInputs'
                                            onChange={(event) => this.handleChange(event, 'seedStart')}
                                            type='date' />
                                    </div>
                                    <div>
                                        <InputLabel>Harden Off Date</InputLabel>
                                        <TextField
                                            variant='outlined'
                                            className='formInputs'
                                            defaultValue={this.state.newPlant.hardenOff}
                                            onChange={(event) => this.handleChange(event, 'hardenOff')}
                                            type='date' />
                                    </div>
                                    <div>
                                        <InputLabel>Plant Outdoors*</InputLabel>
                                        <TextField
                                            variant='outlined' className='formInputs'
                                            defaultValue={this.state.newPlant.plantOutdoors}
                                            onChange={(event) => this.handleChange(event, 'plantOutdoors')}
                                            type='date' />
                                    </div>
                                </div>
                                <div className='inputContainer'>
                                    <div>
                                        <InputLabel>Image Path*</InputLabel>
                                        <TextField
                                            variant='outlined' className='formInputs'
                                            defaultValue={this.state.newPlant.imagePath}
                                            onChange={(event) => this.handleChange(event, 'imagePath')}
                                            type='text' />
                                    </div>
                                    <div>
                                        <InputLabel>Notes</InputLabel>
                                        <TextField
                                            defaultValue={this.state.newPlant.notes}
                                            variant='outlined' className='formInputs'
                                            style={{ width: 400 }}
                                            onChange={(event) => this.handleChange(event, 'notes')}
                                            type='text' />
                                    </div>
                                    <DropzoneS3Uploader
                                        onFinish={this.handleFinishedUpload}
                                        s3Url={s3Url}
                                        maxSize={1024 * 1024 * 5}
                                        upload={uploadOptions}
                                    />
                                    <Button color='secondary' variant='contained' style={{ height: 35, marginTop: 25, marginLeft: 5 }} type='submit'>Add Plant</Button>
                                </div>
                            </form>
                        </div>
                        {/* <PlantTable plantList={this.state.plantList} /> */}
                    </Paper>
                }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PlantForm);