import moment from 'moment';
// let todaysDate = moment().add(1, 'd').format('x');
// let overdueTasks;

const overdueReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_OVERDUE_TASKS':
      let todaysDate = moment().add(1, 'd').startOf('day');
      let overdueTasks = [];
      // console.log(todaysDate);
      // console.log(moment().add(1, 'd'))
      // console.log(moment().format('x'))

      overdueTasks = action.payload.filter((obj) => {
        // console.log(moment(obj.due_date));
        // console.log(todaysDate)
        // console.log(moment(obj.due_date) < todaysDate && obj.task_status === false)
        // console.log(obj.id, obj.description)
        return moment(obj.due_date) < todaysDate && obj.task_status === false;
      });
      console.log(overdueTasks);
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