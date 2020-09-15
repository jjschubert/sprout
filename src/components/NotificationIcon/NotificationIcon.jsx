import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EcoIcon from '@material-ui/icons/Eco';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class NotificationIcon extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'GET_TASKS' })
  }



  render() {

    let badgeCount = this.props.store.current.length + this.props.store.overdue.length
  
    return (
      <>
        {this.props.store.user.id &&
          <Link className='nav-link' to='/tasks'>
           {this.props.store.current && <Badge badgeContent={badgeCount} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }} color="secondary"><EcoIcon /></Badge>}
          </Link>
        }
      </>
    );
  }
}

export default connect(mapStoreToProps)(NotificationIcon);