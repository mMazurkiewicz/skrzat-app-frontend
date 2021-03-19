import update from 'immutability-helper';

export const hocListDefaultState = {
  loading: false,
  items: [],
  anchorEl: [],
  totalItems: 0,
  itemsPerPage: 10,
  page: 1,
  totalPages: 1,
};

export const HOCListReducer = ({
  reducer,
  prefix,
  defaultState = hocListDefaultState,
}) => (state, action) => {
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
        totalItems: action.metaData.totalItems,
      };
    case `${prefix}SET_PAGE`:
      return {
        ...defaultState,
        ...state,
        page: action.page,
      };
    case `${prefix}SET_TOTAL_PAGES`:
      return {
        ...defaultState,
        ...state,
        totalPages: action.pages,
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
