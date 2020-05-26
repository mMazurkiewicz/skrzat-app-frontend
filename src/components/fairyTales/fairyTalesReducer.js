const fairyTalesDefaultState = {
    loading: false,
};

export default (state = fairyTalesDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: action.toggle
    }
    default:
      return state;
  }
};
