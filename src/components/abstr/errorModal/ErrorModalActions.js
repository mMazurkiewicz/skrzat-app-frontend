export const prefix = 'ERROR_MODAL_';

export const toggleModalAction = (toggle) => ({
  type: `${prefix}TOGGLE_MODAL`,
  toggle,
});

export const setMessageAction = (message) => ({
  type: `${prefix}SET_MESSAGE`,
  message,
});

export const showErrorModalAction = (message) => (dispatch) => {
  dispatch(setMessageAction(message));
  dispatch(toggleModalAction(true));
};
