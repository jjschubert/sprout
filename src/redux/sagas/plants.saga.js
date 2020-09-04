import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPlants() {
    console.log('got to fetch plants')
    try{
    //get request
   let response = yield axios.get('/api/plants');
//should do try catch - skipping for time
    //send to reducer
    yield put({type: 'SET_PLANTS', payload: response.data})
    } catch (error) {
        console.log('err in fetchPlants', error)
    }
}

function* waterPlant(action) {
    console.log('in waterPlant')
    try {
        console.log(action.payload)
       yield axios.put('/api/water', action.payload)
    } catch (err) {
        console.log('error in waterPlant', err)
    }

}

//must put this in the root saga to work
//import and in the reducer itself
function* plantsSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
    yield takeLatest('WATER_PLANT', waterPlant)
}

export default plantsSaga;