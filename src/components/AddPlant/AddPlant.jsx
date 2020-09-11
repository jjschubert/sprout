import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './AddPlant.css';
import {Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';
import PlantForm from '../PlantForm/PlantForm';


class AddPlant extends Component {
  state = {
    heading: 'AddPlant Component',
  };

  componentDidMount() {
      this.props.dispatch({type: 'FETCH_TASKS'})
  }

  render() {
    return (
      <div className='bkg'>
        <PlantForm />
        <Paper>
        <h2>{this.state.heading}</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plant Name</TableCell>
            <TableCell align="right">Seed Start</TableCell>
            <TableCell align="right">Harden Off</TableCell>
            <TableCell align="right">Plant</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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