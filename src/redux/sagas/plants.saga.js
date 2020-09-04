import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPlants() {
    console.log('got to fetch plants')
    //get request
   let response = yield axios.get('/api/plants');
//should do try catch - skipping for time
    //send to reducer
    yield put({type: 'SET_PLANTS', payload: response.data})
}

//must put this in the root saga to work
//import and in the reducer itself
function* plantsSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants)
}

export default plantsSaga;