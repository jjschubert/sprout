import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, Button, Typography } from '@material-ui/core/';
import './Details.css';
import moment from 'moment';
import EditModule from '../EditModule/EditModule.jsx';


class Details extends Component {
    state = {
        update: false
    };

    componentDidMount() {
        let id = this.props.match.params.plant_id
        console.log(id)
        this.props.dispatch({ type: 'FETCH_TASKS' })
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
        this.props.dispatch({type: 'GET_TASK_DETAILS', payload: id})
    }
        

    waterPlant = (plant) => {
        console.log('mark watered', plant)
        this.props.dispatch({ type: 'WATER_PLANT', payload: plant });
        let id = this.props.match.params.plant_id;
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
        this.setState({ update: !this.state.update})
      
    }

    fertilizePlant = (plant) => {
        console.log('mark watered', plant)
        this.props.dispatch({ type: 'FERTILIZE_PLANT', payload: plant });
        let id = this.props.match.params.plant_id;
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
        this.setState({ update: !this.state.update})
    }

    render() {


        return (
            <div className='detailContainer'>
                {this.props.store.details[0] &&

                    <Card className='details'>
                        <Typography variant='h5' className='title'>Plant Detail: {this.props.store.details[0].name}</Typography>


                        <div className='body'>
    
                        <img className='plant_image' src={this.props.store.details[0].image_path} alt={this.props.store.details[0].name} />

                        <div className='section'>
                        
                                <Typography className='inline' variant='body1'><span className='bold'>Last Watered: </span>
                                    {this.props.store.details[0].last_water ?
                                        moment(this.props.store.details[0].last_water).format('MMMM Do')
                                        : <span>never</span>}
                                </Typography> 
                                <Button style={{height: 20, margin: 1}} className='today' size="small" onClick={() => this.waterPlant(this.props.store.details[0])} variant="outlined" color='primary' >Today</Button>
                                <br />
                                <Typography className='inline' variant='body1'><span className='bold'>Last Fertilized: </span>
                                    {this.props.store.details[0].last_fertilize ?
                                        moment(this.props.store.details[0].last_fertilize).format('MMMM Do')
                                        : <span>never</span>}</Typography>
                                        <Button style={{height: 20, margin: 1}} className='today' onClick={() => this.fertilizePlant(this.props.store.details[0])} variant="outlined" color='primary' size="small">Today</Button>
                                        </div>

                            <div className='section'>
                                {this.props.store.details.map((item) => {
                                    if (item.due_date !== null) {
                                    return (
                                        <Typography variant='body1' key={item.type_id}>
                                            <span className='bold'>{item.description}: </span>
                                            {moment(item.due_date).format('MMMM Do')}
                                        </Typography>
                                    )}
                                    else return false;
                                })}
                            </div>
                                <div className='section'>
                                <Typography variant='body1'><span className='bold'>Notes: </span>
                                    {this.props.store.details[0].notes}</Typography>
                            </div>
                        </div>
                        <div className='inline'>
                            <Button onClick={() => this.props.history.push('/dashboard')}>Back</Button>   
                        </div>
                        <EditModule id={this.props.match.params.plant_id}/>
                    </Card>}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Details);
