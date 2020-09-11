

const taskObjReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TASK_OBJ':
        return action.payload;
      //must unset to protect data. Anytime you set, you must unset
      //would be dispatched when you click logout
  
      case 'UNSET_TASKS':
        return [];
      default:
        return state;
    }
  }
  
  export default taskObjReducer;