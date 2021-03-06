import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Card, Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import './Dashboard.css'
import WaterSnackbar from '../WaterSnackbar/WaterSnackbar';




class Dashboard extends Component {
    state = {
        heading: 'Your Garden',
    };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PLANTS' })
        this.props.dispatch({ type: 'FETCH_TASKS' })
    }

    render() {
        return (
            <div className='dashboard'>
                <h2 className='title' >{this.state.heading}</h2>
                <div className='container' id='dashboard'>
                    {this.props.store.plants.map((plant) => (
                        <Card key={plant.id} className='item' style={{minHeight: 350}}>
                            <div className='card-content'>
                                <img className='plant_image' src={plant.image_path} alt={plant.name} />
                                <div className='title-div'>
                                    <Typography variant="h5">{plant.name}</Typography>
                                </div>
                                <Button className='iconBtn' onClick={() => this.props.history.push('/details/' + plant.id)}>
                                    <InfoIcon /></Button>
                                    <WaterSnackbar plant={plant}/>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Dashboard);
