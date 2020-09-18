import moment from 'moment';


const currentTasksReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_CURRENT_TASKS':
      let todaysDate = moment('05/15/2020');
      console.log(todaysDate, 'today')
      let todaysTasks;
      todaysTasks = action.payload.filter((obj) => {
        return moment(obj.due_date).isSame(todaysDate, 'day') && obj.task_status === false;
      });
      return todaysTasks;

    // case 'SET_OVERDUE_TASKS':
    //   return action.payload;
    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default currentTasksReducer;