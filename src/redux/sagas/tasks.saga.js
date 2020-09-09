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

//gets tasks for one plant
function* fetchTaskDetails(action) {
    try {
        let response = yield axios.get(`/api/tasks/${action.payload}`)
        yield put({type: 'SET_TASK_DETAILS', payload: response.data})
    } catch (error) {
        console.log('error in fetchTaskDetails', error)
    }
}

function* fetchCurrentTasks() {
    try {
        let response = yield axios.get('/api/tasks');
        yield put({type: 'SET_CURRENT_TASKS', payload: response.data})
    } catch (error) {
        console.log('error in currentTasks', error)
    }
}

function* fetchOverdueTasks() {
    try {
        let response = yield axios.get('/api/tasks');
        yield put({type: 'SET_OVERDUE_TASKS', payload: response.data})
    } catch (error) {
        console.log('error in overdueTasks', error)
    }
}


function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks)
    yield takeLatest('GET_TASK_DETAILS', fetchTaskDetails)
    yield takeLatest('GET_CURRENT_TASKS', fetchCurrentTasks)
    yield takeLatest('GET_OVERDUE_TASKS', fetchOverdueTasks)
}

export default tasksSaga;