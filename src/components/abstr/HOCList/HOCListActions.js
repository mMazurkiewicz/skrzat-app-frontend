class HOCListActions {
  constructor(config) {
    this.prefix = config.prefix;
  }

  saveItemsFromServer = (items) => ({
    type: `${this.prefix}SAVE_ITEMS_FROM_SERVER`,
    items,
  });

  toggleLoading = (toggle) => ({
    type: `${this.prefix}TOGGLE_LOADING`,
    toggle,
  });
}

export default HOCListActions;
