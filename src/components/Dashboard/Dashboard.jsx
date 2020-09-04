import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Card, Button } from '@material-ui/core';
import OpacityIcon from '@material-ui/icons/Opacity';
import './Dashboard.css'



class Dashboard extends Component {
  state = {
    heading: 'Dashboard',
  };

  componentDidMount() {
      this.props.dispatch({type: 'FETCH_PLANTS'})
  }

  waterPlant = (plant) => {
      console.log('mark watered', plant)
      this.props.dispatch({type: 'WATER_PLANT', payload: plant})
  }

  render() {
    return (
        <>
        <h2>{this.state.heading}</h2>
      <div className='container'>
                {this.props.store.plants.map((plant) => (
                    <Card key={plant.id} className='item'>
                    <div className='card-content'>
                        <img className ='plant_image' src={plant.image_path} alt={plant.name} />
                        <div className='title-div'>
                            <Typography variant="h4">{plant.name}</Typography>
                        </div>
                        <Button onClick={() => this.waterPlant(plant)} className='water'>
                        <OpacityIcon>Opacity</OpacityIcon>
                        </Button>
                    </div>
                    </Card>
                ))}
      </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(Dashboard);
