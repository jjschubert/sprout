import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TextField, Button, Paper, CircularProgress } from '@material-ui/core';
import './PlantForm.css';
import PlantTable from '../PlantTable/PlantTable.jsx'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';



const dropStyle = {
    width: '400px',
    height: '50px',
    border: '2px dashed #b32274',
    marginBottom: '10px'
}


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
        plantList: '',
        progress: false,
    };



    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TASK_OBJ' });
        this.props.dispatch({ type: 'FETCH_TASKS' })
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
    }

    handleFinishedUpload = info => {
        console.log('handleFinishedUpload called')
        this.setState({
            ...this.state,
            progress: false,
            newPlant: {
                ...this.state.newPlant,
                imagePath: info.fileUrl
            }
        })
        console.log(this.state)
    }

    toggleProgress = () => {
        this.setState({
            ...this.state,
            progress: true,
        })
        console.log(this.state)
        }
    

    render() {

        const uploadOptions = {
            server: 'http://localhost:5000',
            // signingUrlQueryParams: { uploadType: 'avatar' },
        }
        const s3Url = 'https://veggiebucket.s3.amazonaws.com'

        const innerDropElement = (
            <div className='inner-drop'>
                <p>Click or Drop Plant Image Here</p>
            </div>
        )

   

        return (
            <div>
                {this.props.store.taskObj[0] &&
                    <Paper >
                        <div className='formDiv' >
                            <form onSubmit={this.addPlant}>
                                <div className='inputContainer'>
                                    <div>
                                        <TextField
                                            label='Plant name'
                                            variant="outlined"
                                            type='text' className='formInputs'
                                            value={this.state.newPlant.plantName}
                                            onChange={(event) => this.handleChange(event, 'plantName')}
                                            required />
                                    </div>
                                    <div>
                                        <TextField
                                            variant='outlined'
                                            InputLabelProps={{ shrink: true }}
                                            label='Seed start date'
                                            value={this.state.newPlant.seedStart}
                                            className='formInputs'
                                            onChange={(event) => this.handleChange(event, 'seedStart')}
                                            type='date' />
                                    </div>
                                    <div>
                                        <TextField
                                            label='Harden off date'
                                            InputLabelProps={{ shrink: true }}
                                            variant='outlined'
                                            className='formInputs'
                                            value={this.state.newPlant.hardenOff}
                                            onChange={(event) => this.handleChange(event, 'hardenOff')}
                                            type='date' />
                                    </div>
                                    <div>
                                        <TextField
                                            variant='outlined' className='formInputs'
                                            label='Plant outdoors date'
                                            InputLabelProps={{ shrink: true }}
                                            value={this.state.newPlant.plantOutdoors}
                                            onChange={(event) => this.handleChange(event, 'plantOutdoors')}
                                            required
                                            type='date' />
                                    </div>
                                </div>
                                    <div className='inputContainer'>
                                        <TextField
                                            label='Notes'
                                            value={this.state.newPlant.notes}
                                            variant='outlined' className='formInputs'
                                            style={{ width: 400 }}
                                            onChange={(event) => this.handleChange(event, 'notes')}
                                            type='text' />
                                        <DropzoneS3Uploader
                                            children={innerDropElement}
                                            s3Url={s3Url}
                                            maxSize={1024 * 1024 * 5}
                                            upload={uploadOptions}
                                            style={dropStyle}
                                            onFinish={this.handleFinishedUpload}
                                            onProgress={this.toggleProgress}
                                        />
                                    </div>
                                <div className='inputContainer'>
                                    {this.state.newPlant.imagePath ?
                                        <Button color='secondary' variant='contained' style={{ height: 35, margin: 5 }} type='submit'>Add Plant</Button>
                                        : <Button color='secondary' variant='contained' disabled style={{ height: 35, margin: 5 }} type='submit'>Add Plant</Button>}
                                    {this.state.progress && <CircularProgress /> }
                                </div>

                            </form>
                        </div>
                        <PlantTable plantList={this.state.plantList} />
                    </Paper>
                }
            </div>
        );
    }
}

export default connect(mapStoreToProps)(PlantForm);