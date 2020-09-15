import moment from 'moment';


const overdueReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_OVERDUE_TASKS':
      
      let todaysDate = moment()
      let overdueTasks = [];
      
      overdueTasks = action.payload.filter((obj) => {
        // return moment(obj.due_date) < todaysDate && obj.task_status === false;
        return moment(obj.due_date).isBefore(todaysDate, 'day') && obj.task_status === false
      });
      return overdueTasks;

    // case 'SET_OVERDUE_TASKS':
    //   return action.payload;
    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default overdueReducer;