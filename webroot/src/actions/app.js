import {
  FETCH_TASKS_FAILURE,
  STORE_TASKS,
  STORE_TASKS_SUCCESS,
  STORE_TASKS_FAILURE,
  UPDATE_TASKS,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_FAILURE
} from "./tasks"

const TYPE_SUCCESS = "success";
const TYPE_PROCESSING = "processing";
const TYPE_ERROR = "error";

const failureMessage = () => {
  return (state, action) => {
    return {
      ...state,
      flashMessage: {
        message: action.payload.response.message,
        type: TYPE_ERROR
      }
    }
  }
};

const ACTION_HANDLERS = {
  [STORE_TASKS]: state => ({
    ...state,
    flashMessage: {
      message: "Saving task...",
      type: TYPE_PROCESSING
    }
  }),
  [STORE_TASKS_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Task saved.",
      type: TYPE_SUCCESS
    }
  }),
  [UPDATE_TASKS]: state => ({
    ...state,
    flashMessage: {
      message: "Updating task...",
      type: TYPE_PROCESSING
    }
  }),
  [UPDATE_TASKS_SUCCESS]: state => ({
    ...state,
    flashMessage: {
      message: "Task updated.",
      type: TYPE_SUCCESS
    }
  }),
  [FETCH_TASKS_FAILURE]: failureMessage(),
  [STORE_TASKS_FAILURE]: failureMessage(),
  [UPDATE_TASKS_FAILURE]: failureMessage()
};

const initialState = {
  flashMessage: []
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}