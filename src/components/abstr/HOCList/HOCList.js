import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import HOCListActions from './HOCListActions';
import { showErrorModalAction } from '../errorModal/ErrorModalActions';

const drawerWidth = 240;

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  td: {
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tr: {
    transition: '0.2s',
  },
  addButton: {
    margin: '10px 0 30px 0',
  },
  chips: {
    margin: '10px 10px 0 0',
  },
  paper: {
    padding: '15px 20px',
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      boxShadow: theme.shadows[7],
    },
    '&:hover $showOnHover': {
      visibility: 'visible',
      opacity: '1',
    },
  },
  showOnHover: {
    visibility: 'visible',
    opacity: '1',
    transition: 'all 0.2s',
    '@media only screen and (any-hover: hover)': {
      visibility: 'hidden',
      opacity: '0',
    },
  },
  verticalCenterInGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const HOCList = (WrappedComponent, { prefix, serverRoute, route }) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.route = `${route}`;
      this.serverRoute = `${window.App.serverPath}${serverRoute}`;
      this.loadData = this.loadData.bind(this);
      this.deleteItemOnServer = this.deleteItemOnServer.bind(this);
      this.goToEdit = this.goToEdit.bind(this);
      this.openItemMenu = this.openItemMenu.bind(this);
      this.closeItemMenu = this.closeItemMenu.bind(this);
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    componentDidMount() {
      this.loadData();
    }

    loadData() {
      const { toggleLoading, saveItemsFromServer, showErrorModal } = this.props;
      toggleLoading(true);
      axios
        .get(this.serverRoute)
        .then((res) => {
          saveItemsFromServer(res.data);
          toggleLoading(false);
        })
        .catch((err) => {
          const error = { err };
          showErrorModal(error.err.response.data);
        });
    }

    deleteItemOnServer(e, itemId) {
      e.stopPropagation();
      axios.delete(`${this.serverRoute}/${itemId}`).then(() => this.loadData());
    }

    openItemMenu(e, index) {
      const { setAnchorEl } = this.props;

      e.stopPropagation();
      setAnchorEl(e && e.currentTarget, index);
    }

    closeItemMenu(e, index) {
      const { setAnchorEl } = this.props;
      e.stopPropagation();
      setAnchorEl(null, index);
    }

    handleDeleteItem(e, id, index) {
      e.stopPropagation();
      this.closeItemMenu(e, index);
      this.deleteItemOnServer(e, id);
    }

    goToEdit(e, itemId, externalRoute) {
      const { history } = this.props;
      e.stopPropagation();

      if (externalRoute) {
        history.push(`/${externalRoute}/${itemId}`);
      } else {
        history.push(`/${this.route}/${itemId}`);
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          deleteItemOnServer={this.deleteItemOnServer}
          goToEdit={this.goToEdit}
          openItemMenu={this.openItemMenu}
          closeItemMenu={this.closeItemMenu}
          handleDeleteItem={this.handleDeleteItem}
        />
      );
    }
  }

  HOC.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
    classes: PropTypes.shape({
      content: PropTypes.string,
      toolbar: PropTypes.string,
      td: PropTypes.string,
    }),
    toggleLoading: PropTypes.func.isRequired,
    saveItemsFromServer: PropTypes.func.isRequired,
    showErrorModal: PropTypes.func.isRequired,
    setAnchorEl: PropTypes.func.isRequired,
  };

  const styledComponent = withStyles(styles)(HOC);

  const actions = new HOCListActions({ prefix });

  return connect(null, {
    ...actions,
    showErrorModal: showErrorModalAction,
  })(styledComponent);
};

export default HOCList;
