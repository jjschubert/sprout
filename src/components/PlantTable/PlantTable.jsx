import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './PlantTable.css';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, Divider} from '@material-ui/core';
import EditModule from '../EditModule/EditModule'
import PlantForm from '../PlantForm/PlantForm';
import moment from 'moment';
import DeleteAlert from '../DeleteAlert/DeleteAlert.jsx'


class AddPlant extends Component {
  state = {
    plantList: ''
  };
 
  getByValue = (arr, value) => {
    for (let i=0; i < arr.length; i++) {
      if (arr[i].type_id === value) {
          if (arr[i].due_date == null) {
            return '-'
          } else {
            return moment(arr[i].due_date).format("MMM Do")
          }
      }
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div className='bkg'>
        <Divider />
        {/* <PlantForm /> */}
        <Paper style={{padding:20}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: 'bold', fontSize: 16}}>Plant Name</TableCell>
            <TableCell align="left" style={{fontWeight: 'bold', fontSize: 16}}>Seed Start</TableCell>
            <TableCell align="left" style={{fontWeight: 'bold', fontSize: 16}}>Harden Off</TableCell>
            <TableCell align="left" style={{fontWeight: 'bold', fontSize: 16}}>Plant Outdoors</TableCell>
            <TableCell align="left" style={{fontWeight: 'bold', fontSize: 16}}>Edit</TableCell>
            <TableCell align="left" style={{fontWeight: 'bold', fontSize: 16}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{opacity: 1}}>

          {this.props.store.taskObj.map((plant) => 
          <TableRow key={plant.plant_id}>
            <TableCell>{plant.plantTasks[0].plantname}</TableCell>
           <TableCell align="left">{this.getByValue(plant.plantTasks, 1)}</TableCell>
           <TableCell align="left">{this.getByValue(plant.plantTasks, 2)}</TableCell>
           <TableCell align="left">{this.getByValue(plant.plantTasks, 3)}</TableCell>
          <TableCell align="left">
            <EditModule id={plant.plant_id}/>
          </TableCell>
          <TableCell align="left"><DeleteAlert id={plant.plant_id}/></TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
   
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddPlant);