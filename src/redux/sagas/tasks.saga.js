import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchTasks() {
    console.log('got to fetch tasks')
    try{
    //get request
   let response = yield axios.get('/api/tasks');
//should do try catch - skipping for time
    //send to reducer
    yield put({type: 'SET_TASKS', payload: response.data})
    } catch (error) {
        console.log('err in fetchTasks', error)
    }
}


function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks)
}

export default tasksSaga;