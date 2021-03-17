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

  setAnchorEl = (element, index) => ({
    type: `${this.prefix}SET_ANCHOR_ELEMENT`,
    element,
    index,
  });
}

export default HOCListActions;
