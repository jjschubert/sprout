import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './AddPlant.css'


class AddPlant extends Component {
  state = {
    heading: 'AddPlant Component',
  };

  render() {
    return (
      <div className='bkg'>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddPlant);