import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Tasks.css'
import { Card, Button, Typography } from '@material-ui/core/';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Tasks extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_TASKS' })
    this.props.dispatch({ type: 'FETCH_CURRENT_TASKS' })
    this.props.dispatch({ type: 'FETCH_OVERDUE_TASKS' })
  }

  state = {
    heading: 'Task Component',
  };

  handleEdit = (id) => {
    console.log(id)
  }

  handleComplete = (id) => {
    console.log(id)
  }

  render() {
    return (
      <div className='taskBkg'>
      
      <Typography variant='h4'>Today's Tasks</Typography>
      <div className='taskContainer'>
      {this.props.store.current.map((task) => {
        return (
          <Card key={task.id} className='taskCard current' style={{background: '#f2f0a2'}}>
            <Typography variant='h6'>Task: {task.description}</Typography>
        <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
        <div>
        <Typography variant='body1' className='inline' >{task.name}</Typography>
        <Button onClick={()=> this.handleEdit(task.id)}>
        <CreateIcon className='inline right' /> </Button>
        <Button onClick={()=> this.handleComplete(task.id)}>
          <CheckCircleIcon className='inline right'  /> </Button>
        </div>
          </Card>

        )
      })}
      </div>
     
     
      <Typography variant='h4'>Overdue Tasks</Typography>
      <div className='taskContainer'>
      {this.props.store.overdue.map((task) => {
        return (
          <Card key={task.id} className='taskCard' style={{background: ' #ff9999'}}>
            <Typography variant='h6'>Task: {task.description}</Typography>
        <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
        <div className='overdue'>
        <Typography variant='body1' className='inline' >{task.name}</Typography>
        <Button onClick={()=> this.handleEdit(task.id)}>
        <CreateIcon className='inline right' /> </Button>
        <Button onClick={()=> this.handleComplete(task.id)}>
          <CheckCircleIcon className='inline right'  /> </Button>
        </div>
          </Card>

        )
      })}
      </div>
    
    
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Tasks);