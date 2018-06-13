import {RSAA} from "redux-api-middleware";

export const FETCH_TASKS = "tasks:fetch_tasks_invoice";
export const FETCH_TASKS_SUCCESS = "tasks:fetch_tasks_success";
export const FETCH_TASKS_FAILURE = "tasks:fetch_tasks_failure";

export const STORE_TASKS = "tasks:store_tasks_invoice";
export const STORE_TASKS_SUCCESS = "tasks:store_tasks_success";
export const STORE_TASKS_FAILURE = "tasks:store_tasks_failure";

export const UPDATE_TASKS = "tasks:update_tasks_invoice";
export const UPDATE_TASKS_SUCCESS = "tasks:update_tasks_success";
export const UPDATE_TASKS_FAILURE = "tasks:update_tasks_failure";

export function fetchTasks() {
  return dispatch => {
    return dispatch({
      [RSAA]: {
        endpoint: "http://127.0.0.1:8000/api/tasks",
        method: "GET",
        types: [FETCH_TASKS, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE]
      }
    })
  }
}

export function storeTask(data) {
  return dispatch => {
    return dispatch({
      [RSAA]: {
        endpoint: "http://127.0.0.1:8000/api/tasks",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        types: [STORE_TASKS, STORE_TASKS_SUCCESS, STORE_TASKS_FAILURE]
      }
    })
  }
}

export function updateTask(id, data) {
  return dispatch => {
    return dispatch({
      [RSAA]: {
        endpoint: `http://127.0.0.1:8000/api/tasks/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        types: [UPDATE_TASKS, UPDATE_TASKS_SUCCESS, UPDATE_TASKS_FAILURE]
      }
    })
  }
}

const ACTION_HANDLERS = {
  [FETCH_TASKS]: state => ({
    ...state,
    fetchingTasks: true,
    fetchingTasksSuccess: false,
    fetchingTasksError: false,
    storingTasksSuccess: false,
    updatingTasksSuccess: false
  }),
  [FETCH_TASKS_SUCCESS]: (state, action) => ({
    ...state,
    fetchingTasks: false,
    fetchingTasksSuccess: true,
    fetchingTasksError: false,
    tasks: action.payload.tasks
  }),
  [FETCH_TASKS_FAILURE]: state => ({
    ...state,
    fetchingTasks: false,
    fetchingTasksSuccess: false,
    fetchingTasksError: true
  }),

  [STORE_TASKS]: state => ({
    ...state,
    storingTasks: true,
    storingTasksSuccess: false,
    storingTasksError: false
  }),
  [STORE_TASKS_SUCCESS]: state => ({
    ...state,
    storingTasks: false,
    storingTasksSuccess: true,
    storingTasksError: false
  }),
  [STORE_TASKS_FAILURE]: state => ({
    ...state,
    storingTasks: false,
    storingTasksSuccess: false,
    storingTasksError: true
  }),

  [UPDATE_TASKS]: state => ({
    ...state,
    updatingTasks: true,
    updatingTasksSuccess: false,
    updatingTasksError: false
  }),
  [UPDATE_TASKS_SUCCESS]: state => ({
    ...state,
    updatingTasks: false,
    updatingTasksSuccess: true,
    updatingTasksError: false
  }),
  [UPDATE_TASKS_FAILURE]: state => ({
    ...state,
    updatingTasks: false,
    updatingTasksSuccess: false,
    updatingTasksError: true
  }),
};

const initialState = {
  fetchingTasks: false,
  fetchingTasksSuccess: false,
  fetchingTasksError: false,
  tasks: null,

  storingTasks: false,
  storingTasksSuccess: false,
  storingTasksError: false,

  updatingTasks: false,
  updatingTasksSuccess: false,
  updatingTasksError: false
};

export default function taskReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
