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


    // description: "start seed"
    // due_date: "2020-04-01T05:00:00.000Z"
    // image_path: "https://www.gardeningknowhow.com/wp-content/uploads/2009/04/cherry-tomatoes-1-400x274.jpg"
    // last_fertilize: null
    // last_water: "2020-09-04T05:00:00.000Z"
    // name: "cherry tomatoes"
    // notes: "In bucket on patio"
    // type_id: 1
    // user_id: 2

    render() {

        return (
            <div className='container'>
                {this.props.store.details[0] &&

                    <Card className='details'>
                        <Typography variant='h4' className='title'>Plant Detail: {this.props.store.details[0].name}</Typography>


                        <div className='body'>
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
                                <Typography variant='body1'><span className='bold'>Last Watered: </span>
                                    {this.props.store.details[0].last_water ?
                                        moment(this.props.store.details[0].last_water).format('MMMM Do, h:mm:ss a')
                                        : <span>never</span>}
                                </Typography>
                                <Typography variant='body1'><span className='bold'>Last Fertilized: </span>
    
                                    {this.props.store.details[0].last_fertilized ?
                                        moment(this.props.store.details[0].last_fertilized).format('MMMM Do, h:mm:ss a')
                                        : <span>never</span>}</Typography>
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
