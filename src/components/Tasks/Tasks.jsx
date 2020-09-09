import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Tasks.css'
import { Card, Typography, IconButton } from '@material-ui/core/';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class Tasks extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_TASKS' })
  }

  state = {
    heading: 'Task Component',
  };

  handleEdit = (id) => {
    console.log(id)
  }

  handleComplete = (id) => {
    this.props.dispatch({type: 'TASK_COMPLETE', payload: id})
    console.log(id)
    this.props.dispatch({type: 'FETCH_TASKS'})
  }

  render() {
    return (
      <div className='taskBkg'>
      
      <Typography variant='h4'>Today's Tasks</Typography>
      <div className='taskContainer'>
      {this.props.store.current.map((task) => {
        return (
          <Card key={task.id} className='taskCard current' style={{background: '#e8f6d5'}}>
            <div className='cardContent'>
            <Typography variant='h6'>Task: {task.description}</Typography>
        <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
        </div>
        <Divider />
        <div className='label'>
        <Typography variant='body1' className='inline' >{task.name}</Typography>
        <IconButton className='inline right' onClick={()=> this.handleComplete(task.id)} >
          <CheckCircleIcon  /> </IconButton>
          <IconButton className='inline right' onClick={()=> this.handleEdit(task.id)} >
          <CreateIcon  />  </IconButton>
        </div>
          </Card>

        )
      })}
      </div>
     
     
      <Typography variant='h4'>Overdue Tasks</Typography>
      <div className='taskContainer'>
      {this.props.store.overdue.map((task) => {
        return (
          <Card key={task.id} className='taskCard' style={{background: '#f7d4e8'}}>
            <div className='cardContent'>
            <Typography variant='h6'>Task: {task.description}</Typography>
        <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
        </div>
        <Divider />
        <div className='overdue label'>
        <Typography variant='body1' className='inline' >{task.name}</Typography>
        <IconButton className='inline right' onClick={()=> this.handleComplete(task.id)} >
          <CheckCircleIcon /> </IconButton>
         <IconButton className='inline right' onClick={()=> this.handleEdit(task.id)}>
          <CreateIcon /> </IconButton>
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