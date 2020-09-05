import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, Button, Typography } from '@material-ui/core/';
import './Details.css';
import moment from 'moment';


class Details extends Component {
    state = {
        heading: 'Details Component',
    };

    componentDidMount() {
        let id = this.props.match.params.plant_id
        console.log(id)
        // this.props.dispatch({ type: 'FETCH_PLANTS' });
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })

    }

    waterPlant = (plant) => {;
        console.log('mark watered', plant)
        this.props.dispatch({ type: 'WATER_PLANT', payload: plant });
        let id = this.props.match.params.plant_id;
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
    }

    render() {

        return (
            <div className='detailContainer'>
                {this.props.store.details[0] &&

                    <Card className='details'>
                        <Typography variant='h4' className='title'>Plant Detail: {this.props.store.details[0].name}</Typography>


                        <div className='body'>

                        <div className='section'>
                        <Button className='today' onClick={() => this.waterPlant(this.props.store.details[0])}>Today</Button>
                                <Typography variant='body1'><span className='bold'>Last Watered: </span>
                                    {this.props.store.details[0].last_water ?
                                        moment(this.props.store.details[0].last_water).format('MMMM Do')
                                        : <span>never</span>}
                                </Typography> 
                                <Button className='today'>Today</Button>
                                <Typography variant='body1'><span className='bold'>Last Fertilized: </span>
                                    {this.props.store.details[0].last_fertilized ?
                                        moment(this.props.store.details[0].last_fertilized).format('MMMM Do')
                                        : <span>never</span>}</Typography>
                                        </div>

                            <div className='section'>
                                {this.props.store.details.map((item) => {
                                    return (
                                        <Typography variant='body1' key={item.type_id}>
                                            <span className='bold'>{item.description}: </span>
                                            {moment(item.due_date).format('MMMM Do')}
                                        </Typography>
                                    )
                                })}
                            </div>
                                <div className='section'>
                                <Typography variant='body1'><span className='bold'>Notes: </span>
                                    {this.props.store.details[0].notes}</Typography>
                            </div>
                        </div>
                        <div className='btnDiv'>
                            <Button onClick={() => this.props.history.push('/dashboard')}>Back</Button>
                            <Button>Edit</Button>
                        </div>
                    </Card>}
            </div>
        );
    }
}

export default connect(mapStoreToProps)(Details);
