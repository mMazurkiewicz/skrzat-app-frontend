export const prefix = 'FAIRYTALES_FORM_';

export const saveItemFromServerAction = (item) => ({
  type: `${prefix}SAVE_ITEM_FROM_SERVER`,
  item,
});

export const handleChangeInputAction = (field, value) => ({
  type: `${prefix}CHANGE_NAME`,
  field,
  value,
});

export const toggleEditAction = (toggle) => ({
  type: `${prefix}TOGGLE_EDIT`,
  toggle,
});

export const toggleLoadingAction = (toggle) => ({
  type: `${prefix}TOGGLE_LOADING`,
  toggle,
});

export const resetStateAction = () => ({
  type: `${prefix}RESET_STATE`,
});
