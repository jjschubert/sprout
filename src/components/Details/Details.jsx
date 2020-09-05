import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Details extends Component {
  state = {
    heading: 'Details Component',
  };

  componentDidMount() {
    let id = this.props.match.params.plant_id
    console.log(id)
    // this.props.dispatch({ type: 'FETCH_PLANTS' });
    this.props.dispatch({type: 'GET_DETAILS', payload: id})
   
}


  render() {

    return (
      <div>
        <h2>{this.state.heading}</h2>
        {this.props.store.details[0] && <p>Hello</p>}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Details);
