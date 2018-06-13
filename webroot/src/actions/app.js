import {
  STORE_TASKS,
  STORE_TASKS_SUCCESS,
  STORE_TASKS_FAILURE,
  UPDATE_TASKS,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_FAILURE
} from "./tasks"

export const ADD_FLASH_MESSAGE = 'app:add_flash_message';
export const DELETE_FLASH_MESSAGE = 'app:delete_flash_message';

const TYPE_SUCCESS = "success";
const TYPE_PROCESSING = "processing";
const TYPE_ERROR = "error";

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage() {
  return {
    type: DELETE_FLASH_MESSAGE
  }
}

const failureMessage = () => {
  return (state, action) => ({
    ...state,
    flashMessage: {
      message: action.payload,
      type: TYPE_ERROR
    }
  })
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
};

const initialState = {
  flashMessage: []
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}