export const prefix = 'FAIRYTALES_LIST_';

export const saveItemsFromServerAction = (items) => ({
  type: `${prefix}SAVE_ITEMS_FROM_SERVER`,
  items,
});

export const toggleLoadingAction = (toggle) => ({
  type: `${prefix}TOGGLE_LOADING`,
  toggle,
});
