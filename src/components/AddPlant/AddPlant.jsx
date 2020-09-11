import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './AddPlant.css';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
// import EditModule from '../EditModule/EditModule'
import PlantForm from '../PlantForm/PlantForm';
import moment from 'moment';


class AddPlant extends Component {
  state = {
    heading: 'AddPlant Component',
  };
 
  getByValue = (arr, value) => {
    for (let i=0; i < arr.length; i++) {
      if (arr[i].type_id === value) {
        console.log(arr[i].due_date)
          if (arr[i].due_date == null) {
            return '-'
          } else {
            return moment(arr[i].due_date).format("MMM Do YY")
          }
      }
    }
  }

  componentDidMount() {
      this.props.dispatch({type: 'FETCH_TASKS'})
      this.props.dispatch({type: 'FETCH_TASK_OBJ'})
  }

  render() {
    return (
      <div className='bkg'>
        <PlantForm />
        <Paper style={{marginTop: 25, padding:20}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plant Name</TableCell>
            <TableCell align="left">Seed Start</TableCell>
            <TableCell align="left">Harden Off</TableCell>
            <TableCell align="left">Plant</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {this.props.store.taskObj.map((plant) => 
          <TableRow key={plant.plant_id}>
            <TableCell>{plant.plantTasks[0].plantname}</TableCell>
           <TableCell align="left">{this.getByValue(plant.plantTasks, 1)}</TableCell>
           <TableCell align="left">{this.getByValue(plant.plantTasks, 2)}</TableCell>
           <TableCell align="left">{this.getByValue(plant.plantTasks, 3)}</TableCell>
          <TableCell align="left"></TableCell>
          <TableCell align="left"></TableCell>
          </TableRow>
          )}
          {/* {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </Paper>
   
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddPlant);