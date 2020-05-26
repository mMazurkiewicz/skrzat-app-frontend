export const saveItemsFromServer = (items) => ({
    type: 'SAVE_ITEMS_FROM_SERVER',
    items
});

export const toggleLoading = (toggle) => ({
    type: 'TOGGLE_LOADING',
    toggle
});
