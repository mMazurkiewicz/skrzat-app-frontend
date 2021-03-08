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
    margin: '0 3px 0 0',
  },
});

const HOCList = (WrappedComponent, { prefix, serverRoute }) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.serverRoute = `${window.App.serverPath}${serverRoute}`;
      this.loadData = this.loadData.bind(this);
      this.deleteItemOnServer = this.deleteItemOnServer.bind(this);
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

    deleteItemOnServer(itemId) {
      axios.delete(`${this.serverRoute}/${itemId}`).then(() => this.loadData());
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          deleteItemOnServer={this.deleteItemOnServer}
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
    classes: PropTypes.shape({
      content: PropTypes.string,
      toolbar: PropTypes.string,
      td: PropTypes.string,
    }),
    toggleLoading: PropTypes.func,
    saveItemsFromServer: PropTypes.func,
    showErrorModal: PropTypes.func,
  };

  const styledComponent = withStyles(styles)(HOC);

  const actions = new HOCListActions({ prefix });

  return connect(null, {
    ...actions,
    showErrorModal: showErrorModalAction,
  })(styledComponent);
};

export default HOCList;
