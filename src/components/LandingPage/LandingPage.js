import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">

        <div className="grid">
          <div className="grid-col grid-col_8">
            <h3>
            Sprout is a task management application that helps gardeners grow bountiful vegetable plants from seed. 
            </h3>

            <p>
            Sprout makes it easy to manage different timelines for each plant as you guide it through various stages, 
            from starting seeds to caring for a sprouting seedling to preparing it for the outdoors to finally planting it outdoors. 
            Plan and track important milestones for each plant and easily view overdue and upcoming tasks. 
            </p>

          </div>
          <div className="grid-col grid-col_4">
            <RegisterForm />

            <center>
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={this.onLogin}>
                Login
              </button>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
