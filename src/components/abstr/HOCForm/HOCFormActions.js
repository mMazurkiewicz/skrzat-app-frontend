class HOCFormActions {
  constructor(config) {
    this.prefix = config.prefix;
  }

  saveItemFromServer = (item) => ({
    type: `${this.prefix}SAVE_ITEM_FROM_SERVER`,
    item,
  });

  handleChangeInput = (field, value) => ({
    type: `${this.prefix}HANDLE_CHANGE`,
    field,
    value,
  });

  toggleEdit = (toggle) => ({
    type: `${this.prefix}TOGGLE_EDIT`,
    toggle,
  });

  toggleLoading = (toggle) => ({
    type: `${this.prefix}TOGGLE_LOADING`,
    toggle,
  });

  resetState = () => ({
    type: `${this.prefix}RESET_STATE`,
  });

  saveEmployeesOptions = (options) => ({
    type: `${this.prefix}SAVE_EMPLOYESS_OPTIONS`,
    options,
  });

  addExtraOptions = (options, field) => ({
    type: `${this.prefix}ADD_EXTRA_OPTIONS`,
    options,
    field,
  });
}

export default HOCFormActions;
