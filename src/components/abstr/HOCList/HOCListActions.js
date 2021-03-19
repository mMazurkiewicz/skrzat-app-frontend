class HOCListActions {
  constructor(config) {
    this.prefix = config.prefix;
  }

  saveItemsFromServer = ({ items, metaData }) => ({
    type: `${this.prefix}SAVE_ITEMS_FROM_SERVER`,
    items,
    metaData,
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

  setPage = (page) => ({
    type: `${this.prefix}SET_PAGE`,
    page,
  });

  setTotalPages = (pages) => ({
    type: `${this.prefix}SET_TOTAL_PAGES`,
    pages,
  });
}

export default HOCListActions;
