import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchTasks() {
    console.log('got to fetch tasks')
    try{
    //get request
   let response = yield axios.get('/api/tasks');
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

//gets all tasks, sends to reducer where filtered by date before return
function* fetchCurrentTasks() {
    try {
        let response = yield axios.get('/api/tasks');
        yield put({type: 'SET_CURRENT_TASKS', payload: response.data})
    } catch (error) {
        console.log('error in currentTasks', error)
    }
}

//gets all tasks, sends to reducer where filtered by date before return
function* fetchOverdueTasks() {
    try {
        let response = yield axios.get('/api/tasks');
        yield put({type: 'SET_OVERDUE_TASKS', payload: response.data})
    } catch (error) {
        console.log('error in overdueTasks', error)
    }
}

function* sendTaskComplete(action) {
    try {
        yield axios.put(`/api/tasks/complete/${action.payload}`)
        yield put({type: 'FETCH_TASKS'})
       
    } catch(error) {
        console.log('error in taskComplete', error)
    }
}

//gets all tasks, sends to reducer where filtered by date before return
function* fetchUpcomingTasks() {
    try {
        let response = yield axios.get('/api/tasks');
        yield put({type: 'SET_UPCOMING_TASKS', payload: response.data})
    } catch (error) {
        console.log('error in upcomingTasks', error)
    }
}



function* tasksSaga() {
    yield takeLatest('FETCH_TASKS', fetchTasks)
    yield takeLatest('GET_TASK_DETAILS', fetchTaskDetails)
    yield takeLatest('GET_CURRENT_TASKS', fetchCurrentTasks)
    yield takeLatest('GET_OVERDUE_TASKS', fetchOverdueTasks)
    yield takeLatest('TASK_COMPLETE', sendTaskComplete)
    yield takeLatest('GET_UPCOMING_TASKS', fetchUpcomingTasks)
}

export default tasksSaga;