import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPlants() {
    console.log('got to fetch plants')
    try{
    //get request
   let response = yield axios.get('/api/plants');
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

function* fertilizePlant(action) {
    console.log('in fertPlant')
    try {
        console.log(action.payload)
       yield axios.put('/api/fertilize', action.payload)
    } catch (err) {
        console.log('error in fertPlant', err)
    }
}

function* getDetails(action) {
    try {
        console.log('fetchDetails, id:', action.payload)
        let response = yield axios.get(`api/plants/${action.payload}`)
        console.log(response.data)
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('error in fetch details', error);
    }
}

function* addPlant(action) {
    try {
        yield axios.post(`/api/plants`, action.payload)
        yield put({type: 'FETCH_TASK_OBJ'})
    } catch (error){
        console.log('error in addPlant', error)
    }
}

function* deletePlant(action) {
    try {
        yield axios.delete('/api/plants', action.payload)
    } catch (error) {
        console.log('error in deletePlant')
    }
}

function* updatePlant(action) {
    try {
        yield axios.put(`/api/plants/${action.payload.id}`, action.payload)
    } catch(error) {
        console.log('error in update plant', error)
    }
}

//must put this in the root saga to work
//import and in the reducer itself
function* plantsSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
    yield takeLatest('WATER_PLANT', waterPlant)
    yield takeLatest('GET_DETAILS', getDetails)
    yield takeLatest('FERTILIZE_PLANT', fertilizePlant)
    yield takeLatest('ADD_PLANT', addPlant)
    yield takeLatest('DELETE_PLANT', deletePlant)
    yield takeLatest ('UPDATE_PLANT', updatePlant)
}

export default plantsSaga;