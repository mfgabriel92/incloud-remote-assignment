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
};

const initialState = {
  flashMessage: []
};

export default function appReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}