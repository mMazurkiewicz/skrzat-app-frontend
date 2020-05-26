const fairyTalesDefaultState = {
    loading: false,
    items: [],
};

export default (state = fairyTalesDefaultState, action) => {
  switch (action.type) {
    case 'SAVE_ITEMS_FROM_SERVER':
      return {
        ...state,
        items: action.items
    }
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: action.toggle
    }
    default:
      return state;
  }
};
