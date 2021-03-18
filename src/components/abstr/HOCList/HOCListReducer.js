import update from 'immutability-helper';

export const HOCListReducer = ({ reducer, prefix, defaultState }) => (
  state,
  action
) => {
  switch (action.type) {
    case `${prefix}TOGGLE_LOADING`:
      return {
        ...defaultState,
        ...state,
        loading: action.toggle,
      };
    case `${prefix}SAVE_ITEMS_FROM_SERVER`:
      return {
        ...defaultState,
        ...state,
        items: action.items,
      };
    case `${prefix}SET_ANCHOR_ELEMENT`:
      return update(state, {
        anchorEl: {
          [action.index]: {
            $set: action.element,
          },
        },
      });
    default:
      if (!reducer) {
        return {
          ...defaultState,
          ...state,
        };
      }
      return reducer(state, action);
  }
};

export default HOCListReducer;
