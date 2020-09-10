import moment from 'moment';

const upcomingReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_UPCOMING_TASKS':
      let todaysDate = moment().add(1, 'd').startOf('day');
      let dateBefore = moment().add(4, 'd').startOf('day');
      let upcomingTasks;
      console.log(todaysDate);
      console.log(dateBefore)
      upcomingTasks = action.payload.filter((obj) => {
        console.log(obj.due_date > todaysDate )
        console.log(obj.due_date > todaysDate && obj.due_date < dateBefore && obj.task_status === false)
        return moment(obj.due_date) > todaysDate && moment(obj.due_date) < dateBefore && obj.task_status === false;
      });
      console.log(upcomingTasks);
      return upcomingTasks;

    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default upcomingReducer;