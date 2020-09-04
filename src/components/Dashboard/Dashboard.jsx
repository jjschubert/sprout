import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography, Card } from '@material-ui/core';

class Dashboard extends Component {
  state = {
    heading: 'Dashboard',
  };

  componentDidMount() {
      this.props.dispatch({type: 'FETCH_PLANTS'})
  }

  render() {
    return (
      <div className='container'>
        <h2>{this.state.heading}</h2>
        <div className='container'>
                {this.props.store.plants.map((plant) => (
                    <Card key={plant.id} className='item' style={{ background: 'white' }}>
                    <div className='card-content'>
                        {/* <Link to={`/details/` + movie.id}> */}
                        <img className ='poster' src={plant.image_path} alt={plant.name} />
                        {/* </Link> */}
                        <div className='title-div'>
                            <Typography variant="h4">{plant.name}</Typography>
                        </div>
                        <Typography variant="body1">{plant.notes}</Typography>
                    </div>
                    </Card>
                ))}
            </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Dashboard);
