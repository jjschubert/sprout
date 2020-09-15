import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './Tasks.css'
import { Card, Typography } from '@material-ui/core/';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import TaskSnackbar from './TaskSnackbar';
import TaskEdit from './TaskEdit';


class Tasks extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_TASKS' })
    // this.props.dispatch({type: 'GET_UPCOMING_TASKS'})
    // this.props.dispatch({type: 'GET_OVERDUE_TASKS'})
    // this.props.dispatch({type: 'GET_CURRENT_TASKS'})
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
        {this.props.store.current[0]? 
        this.props.store.current.map((task) => {
          return (
            <Card key={task.id} className='taskCard current' style={{background: '#e8f6d5'}}>
              <div className='cardContent'>
              <Typography variant='h6'>Task: {task.description}</Typography>
          <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
          </div>
          <Divider />
          <div className='label'>
          <Typography variant='body1' className='inline' >{task.name}</Typography>
            <TaskSnackbar id={task.id}/>
            <TaskEdit task={task}/>
          </div>
            </Card>
  
          )
        })
        : <Typography variant='h6' style={{color: '#b32274'}}>Congrats! You're all caught up</Typography>}
      
      </div>
     
     
      <Typography variant='h4'>Overdue Tasks</Typography>
      <div className='taskContainer'>
        {this.props.store.overdue[0] ? 
        this.props.store.overdue.map((task) => {
          return (
            <Card key={task.id} className='taskCard' style={{background: '#f7d4e8'}}>
              <div className='cardContent'>
              <Typography variant='h6'>Task: {task.description}</Typography>
          <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
          </div>
          <Divider />
          <div className='overdue label'>
          <Typography variant='body1' className='inline' >{task.name}</Typography>
            <TaskSnackbar id={task.id}/>
            <TaskEdit task={task}/>
          </div>
            </Card>
  
          )
        })
      : <Typography variant='h6' style={{color: '#b32274'}}>Wow, you're on top of things!</Typography>}
      
      </div>
    
      <Typography variant='h4'>Upcoming Tasks</Typography>
      <div className='taskContainer'>
      {this.props.store.upcoming.map((task) => {
        return (
          <Card key={task.id} className='taskCard' style={{background: '#deeded'}}>
            <div className='cardContent'>
            <Typography variant='h6'>Task: {task.description}</Typography>
        <Typography variant='body1'>Due: {moment(task.due_date).format('MMMM Do')}</Typography>
        </div>
        <Divider />
        <div className='upcoming label'>
        <Typography variant='body1' className='inline' >{task.name}</Typography>
          <TaskSnackbar id={task.id}/>
          <TaskEdit task={task}/>
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